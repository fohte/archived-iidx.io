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
  className?: string
}

const UserMenu: React.SFC<Props> = ({ displayName, className }) => {
  const [isOpen, setOpeningState] = React.useState(false)

  const boxRef = React.useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (event: any) => {
    if (isOpen && boxRef.current && !boxRef.current.contains(event.target)) {
      setOpeningState(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  const toggleOpeningState = () => {
    setOpeningState(!isOpen)
  }
  const hide = () => {
    if (isOpen) {
      setOpeningState(false)
    }
  }

  return (
    <div className={cx('box')} ref={boxRef}>
      <div className={className} onClick={toggleOpeningState}>
        <span className={cx('displayName')}>{displayName}</span>
        <FontAwesomeIcon icon={faCaretDown} size="xs" />
      </div>
      <div className={cx('dropdown', { hide: !isOpen })}>
        <Link route={`/@${displayName}`}>
          <a className={cx('item')} onClick={hide}>
            Profile
          </a>
        </Link>
        <div className={cx('divider')} />
        <Link route="/results/new">
          <a className={cx('item')} onClick={hide}>
            Register results
          </a>
        </Link>
        <div className={cx('divider')} />
        <div
          className={cx('item')}
          onClick={async () => {
            hide()
            await auth().signOut()
          }}
        >
          Sign out
        </div>
      </div>
    </div>
  )
}

export default UserMenu
