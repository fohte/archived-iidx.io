import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props extends React.HTMLProps<HTMLLabelElement> {
  className?: string
  children?: React.ReactNode
}

const FormLabel: React.FunctionComponent<Props> = ({
  className,
  children,
  ...otherProps
}) => (
  <label className={[cx('label'), className].join(' ')} {...otherProps}>
    {children}
  </label>
)

export default FormLabel
