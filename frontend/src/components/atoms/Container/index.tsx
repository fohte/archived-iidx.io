import classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

interface Props {
  children?: React.ReactNode
  className?: string
}

const Container = ({ children, className }: Props) => (
  <div className={[cx('container'), className].join(' ')}>{children}</div>
)

export default Container
