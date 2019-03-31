import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  as?: any
  children?: React.ReactNode
  className?: string
  active?: boolean
}

const Button: React.FunctionComponent<Props> = ({
  as = 'button',
  children,
  className,
  active = false,
}) =>
  React.createElement(
    as,
    { className: [cx('button', { active }), className].join(' ') },
    children,
  )

export default Button
