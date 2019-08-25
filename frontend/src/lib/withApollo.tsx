import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import App, {
  AppComponentContext,
  AppComponentProps,
  DefaultAppIProps,
} from 'next/app'
import Head from 'next/head'
import React from 'react'
import { getDataFromTree } from '@apollo/react-ssr'

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

export default (PageComponent: typeof TComposedApp) =>
  class WithApollo extends React.Component<Props> {
    public static async getInitialProps(ctx: AppComponentContext) {
      // Initial serverState with apollo (empty)
      let serverState: Props['serverState'] = {
        apollo: {
          data: {},
        },
      }

      // Evaluate the composed component's getInitialProps()
      let appProps = {}
      if ((PageComponent as any).getInitialProps) {
        appProps = await (PageComponent as any).getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!isBrowser) {
        const apolloClient = initApollo()

        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <PageComponent
              {...(appProps as AppProps)}
              apolloClient={apolloClient}
              serverState={serverState}
            />,
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()

        // Extract query data from the Apollo store
        serverState = {
          apollo: {
            data: apolloClient.cache.extract(),
          },
        }
      }

      return {
        ...appProps,
        serverState,
      }
    }

    public apolloClient: AppApolloClient

    public constructor(props: Props) {
      super(props)
      this.apolloClient = initApollo(props.serverState.apollo.data)
    }

    public render() {
      return <PageComponent {...this.props} apolloClient={this.apolloClient} />
    }
  }
