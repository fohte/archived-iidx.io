import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { setDisplayName, wrapDisplayName } from 'recompose'

import withAuthState, { WithAuthStateProps } from './withAuthState'

export interface WithViewerProps {
  loading: boolean
  viewer?: {}
}

const withViewer = (Component: React.ComponentType<WithViewerProps>) => {
  const WithViewer: React.SFC<WithAuthStateProps> = ({
    loading: authStateLoading,
  }) => {
    if (authStateLoading) {
      return <Component loading={true} />
    } else {
      return (
        <Query
          query={gql`
            {
              viewer {
                id
                uid
              }
            }
          `}
        >
          {({ loading, data }) => {
            const { viewer } = data

            if (loading) {
              return <Component loading={true} />
            } else {
              return <Component loading={false} viewer={viewer} />
            }
          }}
        </Query>
      )
    }
  }

  const newDisplayName = wrapDisplayName(Component, 'withViewer')
  const WrappedComponent = setDisplayName<WithAuthStateProps>(newDisplayName)(
    WithViewer,
  )

  return withAuthState(WrappedComponent)
}

export default withViewer
