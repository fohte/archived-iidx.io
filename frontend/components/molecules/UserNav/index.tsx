import * as React from 'react'
import { Button, Loader } from 'semantic-ui-react'

import { InjectedProps } from '@app/lib/withAuthState'
import { Link } from '@app/routes'
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
        <Link route="/signup" prefetch>
          <Button inverted>SignUp</Button>
        </Link>
        <Link route="/login" prefetch>
          <Button inverted style={{ marginLeft: '0.5em' }}>
            Login
          </Button>
        </Link>
      </>
    )
  }
}

export default UserNav
