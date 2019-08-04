import Head from 'next/head'
import * as React from 'react'

import SignupPage from '@app/components/pages/SignupPage'

const Signup = () => (
  <>
    <Head>
      <title>Sign up | iidx.io</title>
    </Head>
    <SignupPage />
  </>
)

export default Signup
