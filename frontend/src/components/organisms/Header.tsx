import * as React from 'react'
import { Container, Menu, Segment } from 'semantic-ui-react'

import Brand from '@app/components/atoms/Brand'
import UserNav from '@app/components/molecules/UserNav'
import withAuthState from '@app/lib/withAuthState'
import { Link } from '@app/routes'

const Header: React.SFC = () => (
  <Segment vertical inverted>
    <Menu secondary inverted>
      <Container>
        <Link route="/" prefetch passHref>
          <Menu.Item as="a">
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
