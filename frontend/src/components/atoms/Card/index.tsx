import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  header: React.ReactNode
  content: React.ReactNode
  className?: string
  clickable?: boolean
}

const Card: React.FunctionComponent<Props> = ({
  header,
  content,
  className,
  clickable = true,
}) => (
  <div className={[cx('card', { clickable }), className].join(' ')}>
    <div className={cx('card-header')}>{header}</div>
    <div>{content}</div>
  </div>
)

export default Card
