import classnames from 'classnames/bind'
import * as React from 'react'

import Brand from '@app/components/atoms/Brand'
import Button from '@app/components/atoms/Button'
import Container from '@app/components/atoms/Container'
import UserMenu from '@app/components/molecules/UserMenu'
import AuthContext from '@app/contexts/AuthContext'
import { Link } from '@app/routes'
import * as css from './style.scss'

const cx = classnames.bind(css)

const Header: React.SFC = () => (
  <nav className={cx('headerNav')}>
    <Container>
      <div className={cx('flexContainer')}>
        <Link route="/" prefetch passHref>
          <a>
            <div className={cx('item')}>
              <Brand />
            </div>
          </a>
        </Link>
        <AuthContext.Consumer>
          {({ loading, viewer }) => {
            if (loading) {
              return <div className={cx('item')}>loading</div>
            }

            if (viewer) {
              return (
                <UserMenu
                  className={cx('item', 'clickable')}
                  displayName={viewer.name}
                />
              )
            }

            return (
              <div className={cx('item', 'non-padding', 'login-signup-group')}>
                <Link route="/login" prefetch>
                  <a>
                    <Button inverted color="white" size="small">
                      Login
                    </Button>
                  </a>
                </Link>
                <Link route="/signup" prefetch>
                  <a>
                    <Button size="small" color="white">
                      Sign Up
                    </Button>
                  </a>
                </Link>
              </div>
            )
          }}
        </AuthContext.Consumer>
      </div>
    </Container>
  </nav>
)

export default Header
