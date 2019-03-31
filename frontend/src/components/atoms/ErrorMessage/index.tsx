import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  children?: React.ReactNode
}

const ErrorMessage: React.FunctionComponent<Props> = ({ children }) => (
  <div className={cx('error-message')}>
    <div className={cx('error-icon')}>
      <FontAwesomeIcon icon={faExclamationTriangle} />
    </div>
    <div className={cx('error-content')}>{children}</div>
  </div>
)

export default ErrorMessage
