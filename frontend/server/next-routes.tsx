import { parse, UrlObject } from 'url'

import pathToRegexp, { PathFunction } from 'path-to-regexp'
import * as React from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import NextRouter, { SingletonRouter } from 'next/router'
import { Omit } from 'utility-types'

export interface RouteParams {
  [k: string]: string | number
}

export interface LinkProps extends Omit<NextLinkProps, 'href'> {
  href?: string | UrlObject
  route: string
  to?: string
  params?: RouteParams
}

export interface Router extends SingletonRouter {
  pushRoute(
    route: string,
    params?: RouteParams,
    options?: any,
  ): Promise<boolean>
  replaceRoute(
    route: string,
    params?: RouteParams,
    options?: any,
  ): Promise<boolean>
  prefetchRoute(
    route: string,
    params?: RouteParams,
  ): Promise<React.ComponentType<any>>
}
const toQuerystring = (obj: any) =>
  Object.keys(obj)
    .filter(key => obj[key] !== null && obj[key] !== undefined)
    .map(key => {
      const value = obj[key]

      if (Array.isArray(value)) {
        return value
          .map(
            arrayValue =>
              `${encodeURIComponent(key)}=${encodeURIComponent(arrayValue)}`,
          )
          .join('&')
      }
      return [encodeURIComponent(key), encodeURIComponent(value)].join('=')
    })
    .join('&')

class Route {
  public name: string
  public pattern: string
  public page: string
  public regex: RegExp
  public keyNames: string[]
  public toPath: PathFunction
  public keys: Array<{ name: string }>

  public constructor({
    name,
    pattern,
    page = name,
  }: {
    name: string
    pattern: string
    page?: string
  }) {
    if (!name && !page) {
      throw new Error(`Missing page to render for route "${pattern}"`)
    }

    this.name = name
    this.pattern = pattern || `/${name}`
    this.page = page.replace(/(^|\/)index$/, '').replace(/^\/?/, '/')
    this.regex = pathToRegexp(this.pattern, (this.keys = []))
    this.keyNames = this.keys.map(key => key.name)
    this.toPath = pathToRegexp.compile(this.pattern)
  }

  public match(path: any) {
    const values = this.regex.exec(path)
    if (values) {
      return this.valuesToParams(values.slice(1))
    }
  }

  public valuesToParams(values: any) {
    return values.reduce((params: {}, val: string | undefined, i: number) => {
      if (val === undefined) return params
      return Object.assign(params, {
        [this.keys[i].name]: decodeURIComponent(val),
      })
    }, {})
  }

  public getHref(params: any = {}) {
    return `${this.page}?${toQuerystring(params)}`
  }

  public getAs(params: any = {}) {
    const as = this.toPath(params) || '/'
    const keys = Object.keys(params)
    const qsKeys = keys.filter(key => this.keyNames.indexOf(key) === -1)

    if (!qsKeys.length) return as

    const qsParams = qsKeys.reduce(
      (qs, key) =>
        Object.assign(qs, {
          [key]: params[key],
        }),
      {},
    )

    return `${as}?${toQuerystring(qsParams)}`
  }

  public getUrls(params: any) {
    const as = this.getAs(params)
    const href = this.getHref(params)
    return { as, href }
  }
}

class Routes {
  public routes: Route[]
  public Link: React.ComponentType<LinkProps>
  public Router: Router

  public constructor({
    Link = NextLink,
    Router = NextRouter,
  }: {
    Link?: typeof NextLink
    Router?: SingletonRouter
  } = {}) {
    this.routes = []
    this.Link = this.getLink(Link)
    this.Router = this.getRouter(Router)
  }

  public add(name: any, pattern: string, page: string) {
    let options
    if (name instanceof Object) {
      options = name
      name = options.name
    } else {
      if (name[0] === '/') {
        page = pattern
        pattern = name
        name = null
      }
      options = { name, pattern, page }
    }

    if (this.findByName(name)) {
      throw new Error(`Route "${name}" already exists`)
    }

    this.routes.push(new Route(options))
    return this
  }

  public findByName(name: string) {
    if (name) {
      return this.routes.filter(route => route.name === name)[0]
    }
  }

  public match(url: string): any {
    const parsedUrl = parse(url, true)
    const { pathname, query } = parsedUrl

    return this.routes.reduce(
      (result, route) => {
        if ((result as any).route) return result
        const params = route.match(pathname)
        if (!params) return result
        return { ...result, route, params, query: { ...query, ...params } }
      },
      { query, parsedUrl },
    )
  }

  public findAndGetUrls(nameOrUrl: string, params: any) {
    const route = this.findByName(nameOrUrl)

    if (route) {
      return { route, urls: route.getUrls(params), byName: true }
    } else {
      const { route, query } = this.match(nameOrUrl)
      const href = route ? route.getHref(query) : nameOrUrl
      const urls = { href, as: nameOrUrl }
      return { route, urls }
    }
  }

  public getRequestHandler(app: any, customHandler?: any) {
    const nextHandler = app.getRequestHandler()

    return (req: any, res: any) => {
      const { route, query, parsedUrl } = this.match(req.url)

      if (route) {
        if (customHandler) {
          customHandler({ req, res, route, query })
        } else {
          app.render(req, res, route.page, query)
        }
      } else {
        nextHandler(req, res, parsedUrl)
      }
    }
  }

  public getLink(Link: typeof NextLink) {
    const LinkRoutes = (props: LinkProps) => {
      const { route, params, to, ...newProps } = props
      const nameOrUrl = route || to

      if (nameOrUrl) {
        Object.assign(newProps, this.findAndGetUrls(nameOrUrl, params).urls)
      }

      return <Link {...(newProps as any)} />
    }
    return LinkRoutes
  }

  public getRouter(Router: typeof NextRouter): Router {
    const wrap = (method: string) => (
      route: string,
      params?: RouteParams,
      options?: any,
    ) => {
      const {
        byName,
        urls: { as, href },
      } = this.findAndGetUrls(route, params)
      return (Router as any)[method](href, as, byName ? options : params)
    }
    ;(Router as Router).pushRoute = wrap('push')
    ;(Router as Router).replaceRoute = wrap('replace')
    ;(Router as Router).prefetchRoute = wrap('prefetch')
    return Router as Router
  }
}

export default (opts?: any) => new Routes(opts)
