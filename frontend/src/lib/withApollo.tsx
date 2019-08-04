import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import App, {
  AppComponentContext,
  AppComponentProps,
  DefaultAppIProps,
} from 'next/app'
import Head from 'next/head'
import React from 'react'
import { getDataFromTree } from 'react-apollo'

import initApollo from '@app/lib/initApollo'
import isBrowser from '@app/lib/isBrowser'

export type AppApolloClient = ApolloClient<NormalizedCacheObject>

type AppProps = DefaultAppIProps & AppComponentProps

export interface Props extends AppProps {
  serverState: {
    apollo: {
      data: NormalizedCacheObject
    }
  }
  apolloClient: AppApolloClient
}

export class TComposedApp extends App<Props> {}

export default (ComposedApp: typeof TComposedApp) =>
  class WithApollo extends React.Component<Props> {
    public static async getInitialProps(ctx: AppComponentContext) {
      const { Component, router } = ctx

      // Initial serverState with apollo (empty)
      let serverState: Props['serverState'] = {
        apollo: {
          data: {},
        },
      }

      // Evaluate the composed component's getInitialProps()
      let appProps = {}
      if ((ComposedApp as any).getInitialProps) {
        appProps = await (ComposedApp as any).getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!isBrowser) {
        const apollo = initApollo()

        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ComposedApp
              {...(appProps as AppProps)}
              Component={Component}
              router={router}
              apolloClient={apollo}
              serverState={serverState}
            />,
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()

        // Extract query data from the Apollo store
        serverState = {
          apollo: {
            data: apollo.cache.extract(),
          },
        }
      }

      return {
        ...appProps,
        serverState,
      }
    }

    public apollo: AppApolloClient

    public constructor(props: Props) {
      super(props)
      this.apollo = initApollo(props.serverState.apollo.data)
    }

    public render() {
      return <ComposedApp {...this.props} apolloClient={this.apollo} />
    }
  }
