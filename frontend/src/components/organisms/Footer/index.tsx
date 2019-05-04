import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import getConfig from 'next/config'
import * as React from 'react'

import Container from '@app/components/atoms/Container'
import * as css from './style.scss'

const cx = classnames.bind(css)

const {
  publicRuntimeConfig: { version },
} = getConfig()

const originalCopyrightYear = 2018

const Footer: React.SFC = () => {
  const currentYear = new Date().getFullYear()
  const copyrightYears =
    currentYear === originalCopyrightYear
      ? `${originalCopyrightYear}`
      : `${originalCopyrightYear}-${currentYear}`

  return (
    <footer className={cx('box')}>
      <Container>
        <div className={cx('inner')}>
          <FontAwesomeIcon icon={faCopyright} /> {copyrightYears} iidx.io |{' '}
          {version}
        </div>
      </Container>
    </footer>
  )
}

export default Footer
