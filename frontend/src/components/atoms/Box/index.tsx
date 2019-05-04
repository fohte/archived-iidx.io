import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  children?: React.ReactNode
  transparent?: boolean
  className?: string
}

const Box: React.FunctionComponent<Props> = ({
  children,
  transparent = false,
  className,
}) => (
  <div className={[cx('box', { transparent }), className].join(' ')}>
    {children}
  </div>
)

export default Box
