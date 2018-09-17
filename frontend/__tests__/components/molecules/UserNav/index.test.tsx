import { Icon } from 'antd'
import { shallow } from 'enzyme'
import * as React from 'react'

import UserNav from '@app/components/molecules/UserNav'
import Login from '@app/components/molecules/UserNav/Login'
import SignUp from '@app/components/molecules/UserNav/SignUp'
import UserMenu from '@app/components/molecules/UserNav/UserMenu'

describe('UserNav', () => {
  it('renders a loading icon when the loading prop is true', () => {
    const wrapper = shallow(<UserNav loading viewer={null} signedIn={false} />)
    expect(wrapper.contains(<Icon type="loading" />)).toBeTruthy()
  })

  it('renders a UserMenu component', () => {
    const wrapper = shallow(
      <UserNav loading={false} viewer={{ id: 'id', name: 'foo' }} signedIn />,
    )
    expect(wrapper.contains(<UserMenu displayName="foo" />)).toBeTruthy()
  })

  it('renders a Login component', () => {
    const wrapper = shallow(
      <UserNav loading={false} viewer={null} signedIn={false} />,
    )
    expect(wrapper.contains(<Login />)).toBeTruthy()
  })

  it('renders a SignUp component', () => {
    const wrapper = shallow(
      <UserNav loading={false} viewer={null} signedIn={false} />,
    )
    expect(wrapper.contains(<SignUp />)).toBeTruthy()
  })
})
