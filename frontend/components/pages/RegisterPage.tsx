import Router from 'next/router'
import * as React from 'react'

import RegisterForm, { Props } from '@app/components/organisms/RegisterForm'
import MainLayout from '@app/components/templates/MainLayout'

const submitRequest: NonNullable<Props['submitRequest']> = async values => {
  console.log(values) // TODO
}

const handleSubmitSuccess: NonNullable<Props['onSubmitSuccess']> = () => {
  Router.push('/')
}

const RegisterPage: React.SFC = () => (
  <MainLayout>
    <RegisterForm
      submitRequest={submitRequest}
      onSubmitSuccess={handleSubmitSuccess}
    />
  </MainLayout>
)

export default RegisterPage
