import classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  className?: string
  children?: React.ReactNode
}

const ButtonGroup: React.FunctionComponent<Props> = ({
  className,
  children,
}) => (
  <div className={[cx('button-group'), className].join(' ')}>{children}</div>
)

export default ButtonGroup
