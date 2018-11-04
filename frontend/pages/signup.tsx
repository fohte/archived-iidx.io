import Router from 'next/router'
import * as React from 'react'
import { Grid, Header } from 'semantic-ui-react'

import LoginOrSignUpForm, {
  Props,
} from '@app/components/organisms/LoginOrSignUpForm'
import MainLayout from '@app/components/templates/MainLayout'
import { auth, ErrorType } from '@app/lib/firebaseApp'

const submitRequest: NonNullable<Props['submitRequest']> = values => {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => resolve())
      .catch((e: ErrorType) => {
        reject(new Error(e.message))
      })
  })
}

const handleSubmitSuccess: NonNullable<Props['onSubmitSuccess']> = () => {
  Router.push('/register')
}

export default () => (
  <MainLayout>
    <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Create your personal account.
        </Header>
        <LoginOrSignUpForm
          submitText="Sign up"
          submitRequest={submitRequest}
          onSubmitSuccess={handleSubmitSuccess}
        />
      </Grid.Column>
    </Grid>
  </MainLayout>
)
