import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import 'whatwg-fetch'

import isBrowser from './isBrowser'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

const create = (initialState?: NormalizedCacheObject) =>
  new ApolloClient({
    connectToDevTools: true,
    ssrMode: !isBrowser,
    link: new HttpLink({
      uri: 'http://localhost:5000/graphql',
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  })

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
