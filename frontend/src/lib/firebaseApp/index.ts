import app from './app'

export const auth = () => app().auth()

export type ErrorType = firebase.auth.Error
