import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props extends React.HTMLProps<HTMLSpanElement> {
  className?: string
}

const ErrorMessage: React.FunctionComponent<Props> = ({
  className,
  ...otherProps
}) => (
  <span
    className={[cx('error-message'), className].join(' ')}
    {...otherProps}
  />
)

export default ErrorMessage
