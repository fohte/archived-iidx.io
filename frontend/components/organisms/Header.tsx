import { Menu } from 'antd'
import styled from 'styled-components'

import Brand from 'components/atoms/Brand'
import UserNav from 'components/molecules/UserNav'
import withViewer from 'lib/withViewer'

const Header: React.SFC = () => (
  <Menu theme="dark" style={{ lineHeight: '64px' }}>
    <BrandWrapper>
      <Brand />
    </BrandWrapper>
    <UserNavWrapper>
      <EnhancedUserNav displayName="fohte" />
    </UserNavWrapper>
  </Menu>
)

const BrandWrapper = styled.div`
  float: left;
`

const UserNavWrapper = styled.div`
  float: right;
`

const EnhancedUserNav = withViewer()(UserNav)

export default Header
