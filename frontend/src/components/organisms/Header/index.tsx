import * as classnames from 'classnames/bind'
import * as React from 'react'
import { Menu } from 'semantic-ui-react'

import Brand from '@app/components/atoms/Brand'
import Container from '@app/components/atoms/Container'
import UserNav from '@app/components/molecules/UserNav'
import withAuthState from '@app/lib/withAuthState'
import { Link } from '@app/routes'
import * as css from './style.scss'

const cx = classnames.bind(css)

const Header: React.SFC = () => (
  <nav className={cx('headerNav')}>
    <Container>
      <div className={cx('flexContainer')}>
        <div className={cx('item')}>
          <Link route="/" prefetch passHref>
            <Menu.Item as="a">
              <Brand />
            </Menu.Item>
          </Link>
        </div>
        <div className={cx('item')}>
          <EnhancedUserNav />
        </div>
      </div>
    </Container>
  </nav>
)

const EnhancedUserNav = withAuthState()(UserNav)

export default Header
