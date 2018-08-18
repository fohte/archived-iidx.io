import { setDisplayName, wrapDisplayName } from 'recompose'
import { Diff } from 'utility-types'

import AuthContext, { AuthContextShape } from 'contexts/AuthContext'

export interface ExternalProps {}
export type InjectedProps = AuthContextShape

const withAuthState = () => <OriginalProps extends {}>(
  WrappedComponent: React.ComponentType<OriginalProps & InjectedProps>,
) => {
  type EnhancedProps = Diff<OriginalProps, InjectedProps> & ExternalProps

  const WithAuthState: React.SFC<EnhancedProps> = props => (
    <AuthContext.Consumer>
      {({ loading, signedIn }) => (
        <WrappedComponent {...props} loading={loading} signedIn={signedIn} />
      )}
    </AuthContext.Consumer>
  )

  const newDisplayName = wrapDisplayName(WrappedComponent, 'withAuthState')

  return setDisplayName<EnhancedProps>(newDisplayName)(WithAuthState)
}

export default withAuthState
