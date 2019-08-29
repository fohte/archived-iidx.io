import { config } from '@fortawesome/fontawesome-svg-core'
import { NextComponentType, NextPageContext } from 'next'
import App, { AppContext, Container } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'

import '@app/global.scss'
import '@app/rawStyles/import.scss'

import ToastContainer from '@app/components/others/ToastContainer'
import AuthStateProvider from '@app/contexts/AuthStateProvider'
import ServerResponseContext from '@app/contexts/ServerResponseContext'
import CurrentDateTimeProvider from '@app/contexts/CurrentDateTimeProvider'
import withApollo, { Props as WithApolloProps } from '@app/lib/withApollo'

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
      }
    }

    public render() {
      const { Component, pageProps, response, apolloClient } = this.props

      return (
        <Container>
          <ApolloProvider client={apolloClient}>
            <AuthStateProvider>
              <CurrentDateTimeProvider>
                <ServerResponseContext.Provider value={response()}>
                  <Component {...pageProps} />
                  <ToastContainer />
                </ServerResponseContext.Provider>
              </CurrentDateTimeProvider>
            </AuthStateProvider>
          </ApolloProvider>
        </Container>
      )
    }
  },
)
