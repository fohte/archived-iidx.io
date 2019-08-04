import Head from 'next/head'
import * as React from 'react'

import RegisterPage from '@app/components/pages/RegisterPage'

const Register = () => (
  <>
    <Head>
      <title>Register | iidx.io</title>
    </Head>

    <RegisterPage />
  </>
)

export default Register
