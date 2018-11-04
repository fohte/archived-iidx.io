import Router from 'next/router'
import * as React from 'react'

import LoginOrSignUpForm, {
  Props,
} from '@app/components/organisms/LoginOrSignUpForm'
import MainLayout from '@app/components/templates/MainLayout'
import { auth, ErrorType } from '@app/lib/firebaseApp'

const submitRequest: NonNullable<Props['submitRequest']> = values => {
  return new Promise((resolve, reject) => {
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => resolve())
      .catch((e: ErrorType) => {
        reject(new Error(e.message))
      })
  })
}

const handleSubmitSuccess: NonNullable<Props['onSubmitSuccess']> = () => {
  Router.push('/')
}

export default () => (
  <MainLayout>
    <LoginOrSignUpForm
      submitText="Log in"
      submitRequest={submitRequest}
      onSubmitSuccess={handleSubmitSuccess}
    />
  </MainLayout>
)
