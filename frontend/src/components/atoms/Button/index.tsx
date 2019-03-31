import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  as?: any
  children?: React.ReactNode
  className?: string
  active?: boolean
  disabled?: boolean
  loading?: boolean
  [key: string]: any
}

const Button: React.FunctionComponent<Props> = ({
  as = 'button',
  children,
  className,
  active = false,
  disabled = false,
  loading = false,
  ...otherProps
}) =>
  React.createElement(
    as,
    {
      className: [cx('button', { active, disabled, loading }), className].join(
        ' ',
      ),
      disabled,
      ...otherProps,
    },
    children,
  )

export default Button
