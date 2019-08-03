import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import '@app/global.scss'
import '@app/rawStyles/toast.scss'

import { NextComponentClass, NextContext, NextStatelessComponent } from 'next'
import App, { AppComponentContext, Container } from 'next/app'
import Router, { DefaultQuery } from 'next/router'
import NProgress from 'nprogress'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'

import ToastContainer from '@app/components/others/ToastContainer'
import AuthStateProvider from '@app/contexts/AuthStateProvider'
import withApollo, { Props } from '@app/lib/withApollo'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export type PageComponentType<
  P = {},
  IP = P,
  Q extends DefaultQuery = DefaultQuery
> =
  | NextComponentClass<P, IP, NextContext<Q>>
  | NextStatelessComponent<P, IP, NextContext<Q>>

export default withApollo(
  class MyApp extends App<Props> {
    public static async getInitialProps({
      Component,
      ctx,
    }: AppComponentContext) {
      return {
        pageProps: (Component as any).getInitialProps
          ? await (Component as any).getInitialProps(ctx)
          : {},
      }
    }

    public render() {
      const { Component, pageProps, apolloClient } = this.props

      return (
        <Container>
          <ApolloProvider client={apolloClient}>
            <AuthStateProvider>
              <Component {...pageProps} />
              <ToastContainer />
            </AuthStateProvider>
          </ApolloProvider>
        </Container>
      )
    }
  },
)
