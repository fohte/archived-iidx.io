import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

type Props = {
  children?: React.ReactNode
}

const Container = ({ children }: Props) => (
  <div className={cx('container')}>{children}</div>
)

export default Container
