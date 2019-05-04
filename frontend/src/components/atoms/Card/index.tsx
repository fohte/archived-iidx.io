import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  header: React.ReactNode
  content: React.ReactNode
  className?: string
}

const Card: React.FunctionComponent<Props> = ({
  header,
  content,
  className,
}) => (
  <div className={[cx('card'), className].join(' ')}>
    <div className={cx('card-header')}>{header}</div>
    <div className={cx('card-content')}>{content}</div>
  </div>
)

export default Card
