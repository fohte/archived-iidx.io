import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import '@app/global.scss'
import '@app/rawStyles/toast.scss'

import { NextComponentType, NextPageContext } from 'next'
import App, { AppContext, Container } from 'next/app'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'

import ToastContainer from '@app/components/others/ToastContainer'
import AuthStateProvider from '@app/contexts/AuthStateProvider'
import withApollo, { Props } from '@app/lib/withApollo'

export type PageComponentType<IP = {}, P = IP> = NextComponentType<
  NextPageContext,
  IP,
  P
>

export default withApollo(
  class MyApp extends App<Props> {
    public static async getInitialProps({ Component, ctx }: AppContext) {
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
