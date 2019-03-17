import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import * as React from 'react'

import { auth } from '@app/lib/firebaseApp'
import { Link } from '@app/routes'
import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  displayName: string
}

const UserMenu: React.SFC<Props> = ({ displayName }) => (
  <div className={cx('box')}>
    <div>
      <span className={cx('displayName')}>{displayName}</span>
      <FontAwesomeIcon icon={faCaretDown} size="xs" />
    </div>
    <div className={cx('dropdown')}>
      <Link route={`/@${displayName}`}>
        <a>
          <div className={cx('item')}>Profile</div>
        </a>
      </Link>
      <div className={cx('divider')} />
      <Link route="/results/new">
        <a>
          <div className={cx('item')}>Register results</div>
        </a>
      </Link>
      <div className={cx('divider')} />
      <div
        className={cx('item')}
        onClick={async () => {
          await auth.signOut()
        }}
      >
        Sign out
      </div>
    </div>
  </div>
)

export default UserMenu
