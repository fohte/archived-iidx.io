import { setDisplayName, wrapDisplayName } from 'recompose'
import { Diff } from 'utility-types'

import { AuthContextShape } from 'contexts/AuthContext'
import withAuthState from 'lib/withAuthState'
import { GetViewerComponent, GetViewerQuery } from 'queries'
import getViewer from 'queries/getViewer.graphql'

export type ExternalProps = AuthContextShape

export interface InjectedProps {
  loading: boolean
  viewer?: GetViewerQuery['viewer']
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
        <GetViewerComponent query={getViewer}>
          {({ error, loading, data }) => {
            if (error || !data) {
              return <div />
            }

            if (loading) {
              return <Component {...props} loading={true} />
            }

            const { viewer } = data
            return <Component {...props} loading={false} viewer={viewer} />
          }}
        </GetViewerComponent>
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
