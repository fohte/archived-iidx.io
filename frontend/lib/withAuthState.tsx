import { setDisplayName, wrapDisplayName } from 'recompose'

import AuthContext, { AuthContextShape } from '../contexts/AuthContext'

const withAuthState = (Component: React.ComponentType<AuthContextShape>) => {
  const WithAuthState: React.SFC = props => (
    <AuthContext.Consumer>
      {({ loading, signedIn }) => (
        <Component {...props} loading={loading} signedIn={signedIn} />
      )}
    </AuthContext.Consumer>
  )

  const newDisplayName = wrapDisplayName(Component, 'withAuthState')

  return setDisplayName(newDisplayName)(WithAuthState)
}

export default withAuthState
