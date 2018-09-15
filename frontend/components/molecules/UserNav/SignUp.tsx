import { Button } from 'antd'
import Link from 'next/link'

const SignUp: React.SFC = () => (
  <Link href="/signup" prefetch>
    <Button>SignUp</Button>
  </Link>
)

export default SignUp
