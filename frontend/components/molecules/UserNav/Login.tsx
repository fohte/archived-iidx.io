import { Button } from 'antd'
import Link from 'next/link'
import * as React from 'react'

const Login: React.SFC = () => (
  <Link href="/login" prefetch>
    <Button>Login</Button>
  </Link>
)

export default Login
