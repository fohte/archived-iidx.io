import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  children?: React.ReactNode
}

const Alert: React.FunctionComponent<Props> = ({ children }) => (
  <div className={cx('alert')}>
    <div className={cx('alert-icon')}>
      <FontAwesomeIcon icon={faExclamationTriangle} />
    </div>
    <div className={cx('alert-content')}>{children}</div>
  </div>
)

export default Alert
