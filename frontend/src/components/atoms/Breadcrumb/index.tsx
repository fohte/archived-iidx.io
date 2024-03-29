import classnames from 'classnames/bind'
import * as React from 'react'

import routes from '@server/routes'

import * as css from './style.scss'

const cx = classnames.bind(css)
const { Link } = routes

export interface Item {
  text: string
  route: string
  active?: boolean
}

export interface Props {
  className?: string
  children?: React.ReactNode
  items: Item[]
}

const Breadcrumb: React.FunctionComponent<Props> = ({ className, items }) => (
  <ol className={[cx('breadcrumb'), className].join(' ')}>
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
