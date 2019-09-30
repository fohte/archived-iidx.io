import { config } from '@fortawesome/fontawesome-svg-core'
import { NextComponentType, NextPageContext } from 'next'
import App, { AppContext } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as Sentry from '@sentry/browser'

import '@app/global.scss'
import '@app/rawStyles/import.scss'

import ToastContainer from '@app/components/others/ToastContainer'
import AuthStateProvider from '@app/contexts/AuthStateProvider'
import SSRContextProvider from '@app/contexts/SSRContextProvider'
import ServerResponseContext from '@app/contexts/ServerResponseContext'
import CurrentDateTimeContext, {
  defaultValues as currentDateTimeValues,
} from '@app/contexts/CurrentDateTimeContext'
import withApollo, { Props as WithApolloProps } from '@app/lib/withApollo'

import '@app/lib/setup'

config.autoAddCss = false

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export type PageComponentType<IP = {}, P = IP> = NextComponentType<
  NextPageContext,
  IP,
  P
>

export interface InitialProps {
  pageProps: any
  response: () => NextPageContext['res']
  currentDateTime: string
}

export default withApollo(
  class MyApp extends App<WithApolloProps & InitialProps> {
    public static defaultProps = {
      response: () => undefined,
    }

    public static async getInitialProps({
      Component,
      ctx,
    }: AppContext): Promise<InitialProps> {
      const pageProps = (Component as any).getInitialProps
        ? await (Component as any).getInitialProps(ctx)
        : {}

      return {
        pageProps,

        // ctx.res を直接参照すると循環依存になるので注意
        response: () => ctx.res,

        currentDateTime: currentDateTimeValues.current,
      }
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, (errorInfo as any)[key])
        })

        Sentry.captureException(error)
      })

      super.componentDidCatch(error, errorInfo)
    }
    public render() {
      const {
        Component,
        pageProps,
        response,
        apolloClient,
        currentDateTime,
      } = this.props

      return (
        <SSRContextProvider>
          <ApolloProvider client={apolloClient}>
            <AuthStateProvider>
              <CurrentDateTimeContext.Provider
                value={{ current: currentDateTime }}
              >
                <ServerResponseContext.Provider value={response()}>
                  <Component {...pageProps} />
                  <ToastContainer />
                </ServerResponseContext.Provider>
              </CurrentDateTimeContext.Provider>
            </AuthStateProvider>
          </ApolloProvider>
        </SSRContextProvider>
      )
    }
  },
)
