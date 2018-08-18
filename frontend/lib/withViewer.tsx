import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { setDisplayName, wrapDisplayName } from 'recompose'

import { AuthContextShape } from 'contexts/AuthContext'
import withAuthState from 'lib/withAuthState'

export interface WithViewerProps {
  loading: boolean
  viewer?: {}
}

const withViewer = (Component: React.ComponentType<WithViewerProps>) => {
  const WithViewer: React.SFC<AuthContextShape> = props => {
    if (props.loading) {
      return <Component {...props} loading={true} />
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
          {({ error, loading, data }) => {
            if (error) {
              return <div />
            }
            if (loading) {
              return <Component {...props} loading={true} />
            } else {
              const { viewer } = data
              return <Component {...props} loading={false} viewer={viewer} />
            }
          }}
        </Query>
      )
    }
  }

  const newDisplayName = wrapDisplayName(Component, 'withViewer')
  const WrappedComponent = setDisplayName<AuthContextShape>(newDisplayName)(
    WithViewer,
  )

  return withAuthState(WrappedComponent)
}

export default withViewer
