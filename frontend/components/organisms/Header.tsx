import Link from 'next/link'
import * as React from 'react'
import { Container, Menu, Segment } from 'semantic-ui-react'

import Brand from '@app/components/atoms/Brand'
import UserNav from '@app/components/molecules/UserNav'
import withAuthState from '@app/lib/withAuthState'

const Header: React.SFC = () => (
  <Segment vertical inverted>
    <Menu secondary inverted>
      <Container>
        <Link href="/" prefetch>
          <Menu.Item>
            <Brand />
          </Menu.Item>
        </Link>
        <Menu.Menu position="right">
          <EnhancedUserNav />
        </Menu.Menu>
      </Container>
    </Menu>
  </Segment>
)

const EnhancedUserNav = withAuthState()(UserNav)

export default Header
