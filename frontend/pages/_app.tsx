import 'semantic-ui-css/semantic.min.css'

import App, { AppComponentContext, Container } from 'next/app'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'

import AuthStateProvider from '@app/contexts/AuthStateProvider'
import withApollo, { Props } from '@app/lib/withApollo'

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
            </AuthStateProvider>
          </ApolloProvider>
        </Container>
      )
    }
  },
)
