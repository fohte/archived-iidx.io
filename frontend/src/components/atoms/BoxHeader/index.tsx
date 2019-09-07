import * as React from 'react'
import classnames from 'classnames/bind'

import * as css from './style.scss'

const cx = classnames.bind(css)

const BoxHeader: React.FC = ({ children }) => (
  <div className={cx('box-header')}>
    <h2>{children}</h2>
  </div>
)

export default BoxHeader
