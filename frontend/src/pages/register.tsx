import Router from 'next/router'
import * as React from 'react'

import RegisterForm, { Props } from '@app/components/organisms/RegisterForm'
import MainLayout from '@app/components/templates/MainLayout'
import { RegisterComponent, RegisterDocument } from '@app/queries'

const handleSubmitSuccess: NonNullable<Props['onSubmitSuccess']> = () => {
  Router.push('/')
}

export default () => (
  <MainLayout>
    <RegisterComponent mutation={RegisterDocument}>
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
