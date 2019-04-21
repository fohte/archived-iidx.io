import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props extends React.HTMLProps<HTMLInputElement> {
  className?: string
  error?: boolean
}

const InputText: React.FunctionComponent<Props> = ({
  className,
  error = false,
  ...otherProps
}) => (
  <input
    className={[cx('input-text', { error }), className].join(' ')}
    type="text"
    {...otherProps}
  />
)

export default InputText
