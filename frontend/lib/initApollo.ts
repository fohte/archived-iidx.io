import 'isomorphic-fetch'

import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'

import { auth } from '../lib/firebaseApp'
import isBrowser from './isBrowser'

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
  if (auth.currentUser) {
    const idToken = await auth.currentUser.getIdToken()

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

  const httpLink = new HttpLink({
    uri: process.env.API_URL,
    credentials: 'same-origin',
  })

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
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
