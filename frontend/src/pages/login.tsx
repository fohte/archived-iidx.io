import Head from 'next/head'
import * as React from 'react'

import LoginPage from '@app/components/pages/LoginPage'

const Login = () => (
  <>
    <Head>
      <title>Login | iidx.io</title>
    </Head>
    <LoginPage />
  </>
)

export default Login
