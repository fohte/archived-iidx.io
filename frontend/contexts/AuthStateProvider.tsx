import * as React from 'react'

import { auth } from '../lib/firebaseApp'
import AuthContext, { AuthContextShape, defaultValues } from './AuthContext'

class AuthStateProvider extends React.Component<{}, AuthContextShape> {
  public state: Readonly<AuthContextShape> = defaultValues

  public componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loading: false, signedIn: true })
      } else {
        this.setState({ loading: false, signedIn: false })
      }
    })
  }

  public render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default AuthStateProvider
