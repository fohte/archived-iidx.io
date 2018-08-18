import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { setDisplayName, wrapDisplayName } from 'recompose'
import { Diff } from 'utility-types'

import { AuthContextShape } from 'contexts/AuthContext'
import withAuthState from 'lib/withAuthState'

export type ExternalProps = AuthContextShape

export interface InjectedProps {
  loading: boolean
  viewer?: {}
}

const withViewer = () => <OriginalProps extends {}>(
  Component: React.ComponentType<OriginalProps & InjectedProps>,
) => {
  type EnhancedProps = Diff<OriginalProps, InjectedProps> & ExternalProps

  const WithViewer: React.SFC<EnhancedProps> = props => {
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
  const WrappedComponent = setDisplayName<EnhancedProps>(newDisplayName)(
    WithViewer,
  )

  return withAuthState()(WrappedComponent)
}

export default withViewer
