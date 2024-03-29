import 'isomorphic-fetch'

import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { BatchHttpLink } from 'apollo-link-batch-http'
import getConfig from 'next/config'

import { auth } from '@app/lib/firebaseApp'
import isBrowser from '@app/lib/isBrowser'

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

const handleError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations,
        )}, Path: ${path}`,
      ),
    )
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

const withAuthorization = setContext(async (_, { headers }) => {
  const currentUser = auth().currentUser

  if (currentUser) {
    const idToken = await currentUser.getIdToken()

    if (idToken) {
      return {
        headers: { ...headers, authorization: `Bearer ${idToken}` },
      }
    }
  }

  return { headers }
})

const create = (initialState?: NormalizedCacheObject) => {
  const cache = new InMemoryCache().restore(initialState || {})

  const httpLink = new BatchHttpLink({
    uri: isBrowser
      ? publicRuntimeConfig.publicApiUrl
      : serverRuntimeConfig.privateApiUrl,
    credentials: 'same-origin',
  })

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    // デフォルトだと errorPolicy が none になっていて、クエリでエラーが発生
    // したときに Error が throw されてしまうが、エラー情報はクエリのレスポンス
    // から取得できるので throw しないようにする
    defaultOptions: {
      query: {
        errorPolicy: 'all',
      },
      watchQuery: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
    link: ApolloLink.from([handleError, withAuthorization, httpLink]),
    cache,
  })
}

const initApollo = (initialState?: NormalizedCacheObject) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}

export default initApollo
