import * as React from 'react'
import { setDisplayName, wrapDisplayName } from 'recompose'
import { Diff } from 'utility-types'

import AuthContext, { AuthContextShape } from '@app/contexts/AuthContext'

export interface ExternalProps {}
export type InjectedProps = AuthContextShape

const withAuthState = () => <OriginalProps extends {}>(
  WrappedComponent: React.ComponentType<OriginalProps & InjectedProps>,
) => {
  type EnhancedProps = Diff<OriginalProps, InjectedProps> & ExternalProps

  const WithAuthState: React.SFC<EnhancedProps> = props => (
    <AuthContext.Consumer>
      {authContexts => (
        <WrappedComponent
          {...props as any} // Workaround for https://github.com/Microsoft/TypeScript/issues/28748
          {...authContexts}
        />
      )}
    </AuthContext.Consumer>
  )

  const newDisplayName = wrapDisplayName(WrappedComponent, 'withAuthState')

  return setDisplayName(newDisplayName)(WithAuthState)
}

export default withAuthState
