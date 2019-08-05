import classnames from 'classnames/bind'
import * as React from 'react'

import Footer from '@app/components/organisms/Footer'
import Header from '@app/components/organisms/Header'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  children?: React.ReactNode
  centering?: boolean
}

const MainLayout = ({ children, centering = false }: Props) => (
  <div className={cx('box')}>
    <Header />
    <div className={cx('content', { centering })}>{children}</div>
    <Footer />
  </div>
)

export default MainLayout
