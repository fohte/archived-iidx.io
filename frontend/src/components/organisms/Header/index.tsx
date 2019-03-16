import * as React from 'react'
import { Menu } from 'semantic-ui-react'

import Brand from '@app/components/atoms/Brand'
import Container from '@app/components/atoms/Container'
import UserNav from '@app/components/molecules/UserNav'
import withAuthState from '@app/lib/withAuthState'
import { Link } from '@app/routes'
import * as css from './style.scss'

const Header: React.SFC = () => (
  <nav className={css.headerNav}>
    <Container>
      <div className={css.flexContainer}>
        <div className={css.item}>
          <Link route="/" prefetch passHref>
            <Menu.Item as="a">
              <Brand />
            </Menu.Item>
          </Link>
        </div>
        <div className={css.item}>
          <EnhancedUserNav />
        </div>
      </div>
    </Container>
  </nav>
)

const EnhancedUserNav = withAuthState()(UserNav)

export default Header
