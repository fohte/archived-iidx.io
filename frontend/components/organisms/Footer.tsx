import getConfig from 'next/config'
import * as React from 'react'
import { Container, Icon, Segment } from 'semantic-ui-react'

const {
  publicRuntimeConfig: { version },
} = getConfig()

const originalCopyrightYear = 2018

const getCopyrightYears = (): string => {
  const currentYear = new Date().getFullYear()

  if (currentYear === originalCopyrightYear) {
    return `${originalCopyrightYear}`
  }

  return `${originalCopyrightYear}-${currentYear}`
}

const Footer: React.SFC = () => (
  <Segment vertical>
    <Container textAlign="center">
      <Icon name="copyright outline" /> {getCopyrightYears()} iidx.io |{' '}
      {version}
    </Container>
  </Segment>
)

export default Footer
