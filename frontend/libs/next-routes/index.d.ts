import { IncomingMessage, ServerResponse } from 'http'
import { Server } from 'next'
import NextLink, { LinkState } from 'next/link'
import { EventChangeOptions, SingletonRouter } from 'next/router'
import { ComponentType } from 'react'

export type HTTPHandler = (
  request: IncomingMessage,
  response: ServerResponse,
) => void

export type RouteParams = {
  [k: string]: string | number
}

export interface LinkProps extends LinkState {
  route: string
  params?: RouteParams
}

export interface Router extends SingletonRouter {
  pushRoute(
    route: string,
    params?: RouteParams,
    options?: EventChangeOptions,
  ): Promise<boolean>
  replaceRoute(
    route: string,
    params?: RouteParams,
    options?: EventChangeOptions,
  ): Promise<boolean>
  prefetchRoute(
    route: string,
    params?: RouteParams,
  ): Promise<React.ComponentType<any>>
}

export interface Registry {
  Link: ComponentType<LinkProps>
  Router: Router
  getRequestHandler(app: Server, custom?: HTTPHandler): HTTPHandler
  add(name: string, pattern?: string, page?: string): this
  add(pattern: string, page: string): this
  add(options: { name: string; pattern?: string; page?: string }): this
}

export class Routes implements Registry {
  public Link: ComponentType<LinkProps>
  public Router: Router
  public new(opts?: { Link?: NextLink; Router?: SingletonRouter }): Routes
  public getRequestHandler(app: Server, custom?: HTTPHandler): HTTPHandler
  public add(name: string, pattern?: string, page?: string): this
  public add(pattern: string, page: string): this
  public add(options: { name: string; pattern?: string; page?: string }): this
}

export default function routes(opts?: {
  Link?: NextLink
  Router?: SingletonRouter
}): Routes
