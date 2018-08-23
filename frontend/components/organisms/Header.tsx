import { Menu } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'

import Brand from 'components/atoms/Brand'
import UserNav from 'components/molecules/UserNav'
import withViewer from 'lib/withViewer'

const Header: React.SFC = () => (
  <Menu theme="dark" style={{ lineHeight: '64px' }}>
    <Link href="/" prefetch>
      <BrandWrapper>
        <Brand />
      </BrandWrapper>
    </Link>
    <UserNavWrapper>
      <EnhancedUserNav />
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
