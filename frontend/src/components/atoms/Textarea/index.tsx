import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props extends React.HTMLProps<HTMLTextAreaElement> {
  className?: string
  error?: boolean
}

const Textarea: React.FunctionComponent<Props> = ({
  className,
  error = false,
  ...otherProps
}) => (
  <textarea
    className={[cx('textarea', { error }), className].join(' ')}
    {...otherProps}
  />
)

export default Textarea
