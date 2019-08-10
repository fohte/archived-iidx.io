import * as React from 'react'

import { GetViewerQuery } from '@app/queries'

export interface AuthContextShape {
  signedIn: boolean
  loading: boolean
  viewer: GetViewerQuery['viewer'] | null
}

export const makeDefaultValues = (): Readonly<AuthContextShape> => ({
  signedIn: false,
  loading: true,
  viewer: null,
})

const AuthContext = React.createContext<AuthContextShape>(makeDefaultValues())

export default AuthContext
