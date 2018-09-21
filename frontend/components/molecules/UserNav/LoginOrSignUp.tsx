import { Button } from 'antd'
import Link from 'next/link'
import * as React from 'react'

const LoginOrSignUp: React.SFC = () => (
  <Link href="/login" prefetch>
    <Button>Login / SignUp</Button>
  </Link>
)

export default LoginOrSignUp
