import * as classnames from 'classnames/bind'
import * as React from 'react'

import Container from '@app/components/atoms/Container'
import Footer from '@app/components/organisms/Footer'
import Header from '@app/components/organisms/Header'
import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  children?: React.ReactNode
}

const MainLayout = ({ children }: Props) => (
  <div className={cx('box')}>
    <Header />
    <div className={cx('content')}>
      <Container>{children}</Container>
    </div>
    <Footer />
  </div>
)

export default MainLayout