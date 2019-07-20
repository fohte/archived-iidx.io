import * as classnames from 'classnames/bind'
import Link from 'next/link'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Item {
  text: string
  href: string
  active?: boolean
}

export interface Props {
  className?: string
  children?: React.ReactNode
  items: Item[]
}

const Breadcrumb: React.FunctionComponent<Props> = ({ className, items }) => (
  <ol className={[cx('breadcrumb'), className].join(' ')}>
    {items.map(({ text, href, active }) => (
      <li key={text} className={cx('breadcrumb-item', { active })}>
        {active ? (
          <span>{text}</span>
        ) : (
          <Link href={href}>
            <a>{text}</a>
          </Link>
        )}
      </li>
    ))}
  </ol>
)

export default Breadcrumb
