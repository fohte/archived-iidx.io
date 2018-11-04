import Link from 'next/link'
import * as React from 'react'
import { Button, Loader } from 'semantic-ui-react'

import { InjectedProps } from '@app/lib/withAuthState'
import UserMenu from './UserMenu'

export interface Props extends InjectedProps {}

const UserNav: React.SFC<Props> = ({ loading, viewer }) => {
  if (loading) {
    return <Loader active inline size="tiny" />
  }

  if (viewer) {
    return <UserMenu displayName={viewer.name} />
  } else {
    return (
      <>
        <Link href="/signup" prefetch>
          <Button inverted>SignUp</Button>
        </Link>
        <Link href="/login" prefetch>
          <Button inverted style={{ marginLeft: '0.5em' }}>
            Login
          </Button>
        </Link>
      </>
    )
  }
}

export default UserNav
