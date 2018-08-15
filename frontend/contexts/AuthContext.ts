import * as React from 'react'

export interface AuthContextShape {
  signedIn: boolean
  loading: boolean
}

export const defaultValues: Readonly<AuthContextShape> = {
  signedIn: false,
  loading: true,
}

const AuthContext = React.createContext<AuthContextShape>(defaultValues)

export default AuthContext
