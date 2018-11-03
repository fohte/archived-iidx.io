import * as React from 'react'
import { Container, Segment } from 'semantic-ui-react'

import Footer from '@app/components/organisms/Footer'
import Header from '@app/components/organisms/Header'

export interface Props {
  children?: any
}

const Content = ({ children }: Props) => (
  <Segment vertical>
    <Container>{children}</Container>
  </Segment>
)

const MainLayout = ({ children }: Props) => (
  <>
    <Header />
    <Content>{children}</Content>
    <Footer />
  </>
)

export default MainLayout
