import Router from 'next/router'
import * as React from 'react'

import RegisterForm, { Props } from '@app/components/organisms/RegisterForm'
import MainLayout from '@app/components/templates/MainLayout'
import { RegisterComponent } from '@app/queries'
import registerMutation from '@app/queries/register.graphql'

const handleSubmitSuccess: NonNullable<Props['onSubmitSuccess']> = () => {
  Router.push('/')
}

const RegisterPage: React.SFC = () => (
  <MainLayout>
    <RegisterComponent mutation={registerMutation}>
      {register => (
        <RegisterForm
          submitRequest={async ({ username, displayName }) => {
            await register({
              variables: { username, displayName },
            })
          }}
          onSubmitSuccess={handleSubmitSuccess}
        />
      )}
    </RegisterComponent>
  </MainLayout>
)

export default RegisterPage
