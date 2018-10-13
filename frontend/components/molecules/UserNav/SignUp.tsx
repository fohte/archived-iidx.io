import { Button } from 'antd'
import Link from 'next/link'
import * as React from 'react'

const SignUp: React.SFC = () => (
  <Link href="/signup" prefetch>
    <Button>SignUp</Button>
  </Link>
)

export default SignUp
