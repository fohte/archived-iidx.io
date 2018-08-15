import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { setDisplayName, wrapDisplayName } from 'recompose'

export interface WithAuthStateProps {
  loading: boolean
  signedIn: boolean
}

const withAuthState = (Component: React.ComponentType<WithAuthStateProps>) => {
  const WithAuthState = () => (
    <Query
      query={gql`
        {
          loadedAuth @client
          signedIn @client
        }
      `}
    >
      {({ loading, data }) => {
        const { loadedAuth, signedIn } = data

        if (loading || !loadedAuth) {
          return <Component loading={true} signedIn={false} />
        } else {
          return <Component loading={false} signedIn={signedIn} />
        }
      }}
    </Query>
  )

  const newDisplayName = wrapDisplayName(Component, 'withAuthState')

  return setDisplayName(newDisplayName)(WithAuthState)
}

export default withAuthState
