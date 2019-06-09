import * as classnames from 'classnames/bind'
import * as React from 'react'

import { Link } from '@app/routes'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Item {
  text: string
  route: string
  active?: boolean
}

export interface Props {
  children?: React.ReactNode
  items: Item[]
}

const Breadcrumb: React.FunctionComponent<Props> = ({ items }) => (
  <ol className={cx('breadcrumb')}>
    {items.map(({ text, route, active }) => (
      <li key={text} className={cx('breadcrumb-item', { active })}>
        {active ? (
          <span>{text}</span>
        ) : (
          <Link route={route}>
            <a>{text}</a>
          </Link>
        )}
      </li>
    ))}
  </ol>
)

export default Breadcrumb
