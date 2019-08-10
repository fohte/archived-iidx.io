import classnames from 'classnames/bind'
import Router from 'next/router'
import * as React from 'react'

import Box from '@app/components/atoms/Box'
import RegisterForm, { Props } from '@app/components/organisms/RegisterForm'
import MainLayout from '@app/components/templates/MainLayout'
import { useRegisterMutation } from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)

const handleSubmitSuccess: NonNullable<Props['onSubmitSuccess']> = () => {
  Router.push('/')
}

const RegisterPage = () => {
  const [register] = useRegisterMutation()

  return (
    <MainLayout centering>
      <div className={cx('container')}>
        <Box transparent className={cx('header')}>
          <h2>Register your profile.</h2>
        </Box>
        <Box>
          <RegisterForm
            submitRequest={async ({ username, displayName }) => {
              await register({
                variables: { username, displayName },
              })
            }}
            onSubmitSuccess={handleSubmitSuccess}
          />
        </Box>
      </div>
    </MainLayout>
  )
}

export default RegisterPage
