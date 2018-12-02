import Router from 'next/router'
import * as React from 'react'
import { Grid, Header, Message } from 'semantic-ui-react'

import LoginOrSignUpForm, {
  Props,
} from '@app/components/organisms/LoginOrSignUpForm'
import MainLayout from '@app/components/templates/MainLayout'
import { auth, ErrorType } from '@app/lib/firebaseApp'
import { Link } from '@app/routes'

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
    <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <LoginOrSignUpForm
          submitText="Log in"
          submitRequest={submitRequest}
          onSubmitSuccess={handleSubmitSuccess}
        />
        <Message>
          New to us?{' '}
          <Link route="/signup" prefetch>
            <a>Sign up.</a>
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  </MainLayout>
)
