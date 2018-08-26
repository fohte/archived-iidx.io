import * as React from 'react'

import { GetViewerViewer } from 'queries'

export interface AuthContextShape {
  signedIn: boolean
  loading: boolean
  viewer: GetViewerViewer | null
}

export const makeDefaultValues = (): Readonly<AuthContextShape> => ({
  signedIn: false,
  loading: true,
  viewer: null,
})

const AuthContext = React.createContext<AuthContextShape>(makeDefaultValues())

export default AuthContext
