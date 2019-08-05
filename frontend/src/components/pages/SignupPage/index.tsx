import classnames from 'classnames/bind'
import Router from 'next/router'
import * as React from 'react'

import Box from '@app/components/atoms/Box'
import LoginOrSignUpForm, {
  Props,
} from '@app/components/organisms/LoginOrSignUpForm'
import MainLayout from '@app/components/templates/MainLayout'
import { auth, ErrorType } from '@app/lib/firebaseApp'
import routes from '@app/routes'

import * as css from './style.scss'

const { Link } = routes

const cx = classnames.bind(css)

const submitRequest: NonNullable<Props['submitRequest']> = values => {
  return new Promise((resolve, reject) => {
    auth()
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

const SignupPage = () => (
  <MainLayout centering>
    <div className={cx('container')}>
      <Box transparent className={cx('header')}>
        <h2>Create your personal account.</h2>
      </Box>
      <Box>
        <LoginOrSignUpForm
          submitText="Sign up"
          submitRequest={submitRequest}
          onSubmitSuccess={handleSubmitSuccess}
        />
      </Box>
      <Box transparent className={cx('footer')}>
        Already have an account?{' '}
        <Link route="/login" prefetch>
          <a>Log in.</a>
        </Link>
      </Box>
    </div>
  </MainLayout>
)

export default SignupPage
