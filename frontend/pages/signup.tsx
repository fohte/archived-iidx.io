import Router from 'next/router'
import * as React from 'react'

import SignUpForm, { Props } from '@app/components/organisms/SignUpForm'
import MainLayout from '@app/components/templates/MainLayout'
import { auth, ErrorType } from '@app/lib/firebaseApp'

const submitRequest: NonNullable<Props['submitRequest']> = async values => {
  await auth
    .createUserWithEmailAndPassword(values.email, values.password)
    .catch((err: ErrorType) => {
      throw new Error(err.message)
    })
}

const handleSubmitSuccess: NonNullable<Props['onSubmitSuccess']> = () => {
  Router.push('/register')
}

export default () => (
  <MainLayout>
    <SignUpForm
      submitRequest={submitRequest}
      onSubmitSuccess={handleSubmitSuccess}
    />
  </MainLayout>
)
