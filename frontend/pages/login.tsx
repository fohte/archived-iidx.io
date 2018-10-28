import Router from 'next/router'
import * as React from 'react'

import LoginForm, { Props } from '@app/components/organisms/LoginForm'
import MainLayout from '@app/components/templates/MainLayout'
import { auth, ErrorType } from '@app/lib/firebaseApp'

const submitRequest: NonNullable<Props['submitRequest']> = async values => {
  await auth
    .signInWithEmailAndPassword(values.email, values.password)
    .catch((err: ErrorType) => {
      throw new Error(err.message)
    })
}

const handleSubmitSuccess: NonNullable<Props['onSubmitSuccess']> = () => {
  Router.push('/')
}

export default () => (
  <MainLayout>
    <LoginForm
      submitRequest={submitRequest}
      onSubmitSuccess={handleSubmitSuccess}
    />
  </MainLayout>
)
