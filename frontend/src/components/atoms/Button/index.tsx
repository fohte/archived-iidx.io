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
  inverted?: boolean
  size?: 'small'
  color?: 'white' | 'black'
  expand?: boolean
  [key: string]: any
}

const Button: React.FunctionComponent<Props> = ({
  as = 'button',
  children,
  className,
  active = false,
  disabled = false,
  loading = false,
  inverted = false,
  expand = true,
  size,
  color,
  ...otherProps
}) =>
  React.createElement(
    as,
    {
      className: [
        cx(
          'button',
          { active, disabled, loading, inverted, expand },
          size,
          color,
        ),
        className,
      ].join(' '),
      disabled,
      ...otherProps,
    },
    children,
  )

export default Button
