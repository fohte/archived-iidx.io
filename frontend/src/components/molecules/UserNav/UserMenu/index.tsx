import * as React from 'react'

import { auth } from '@app/lib/firebaseApp'
import { Link } from '@app/routes'
import * as css from './style.scss'

export interface Props {
  displayName: string
}

const UserMenu: React.SFC<Props> = ({ displayName }) => (
  <div className={css.box}>
    {displayName}
    <div className={css.dropdown}>
      <Link route={`/@${displayName}`}>
        <a>
          <div className={css.item}>Profile</div>
        </a>
      </Link>
      <div className={css.divider} />
      <Link route="/results/new">
        <a>
          <div className={css.item}>Register results</div>
        </a>
      </Link>
      <div className={css.divider} />
      <div
        className={css.item}
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
