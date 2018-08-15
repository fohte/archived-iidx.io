import 'isomorphic-fetch'

import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'

import { auth } from '../lib/firebaseApp'
import isBrowser from './isBrowser'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

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

  const stateLink = withClientState({
    cache,
    resolvers: {},
    defaults: {
      signedIn: false,
      loadedAuth: false,
    },
  })

  const httpLink = new HttpLink({
    uri: process.env.API_URL,
    credentials: 'same-origin',
  })

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: ApolloLink.from([stateLink, withAuthorization, httpLink]),
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

    auth.onAuthStateChanged(user => {
      if (apolloClient != null) {
        if (user) {
          apolloClient.writeData({ data: { loadedAuth: true, signedIn: true } })
        } else {
          apolloClient.writeData({
            data: { loadedAuth: true, signedIn: false },
          })
        }
      }
    })
  }

  return apolloClient
}

export default initApollo
