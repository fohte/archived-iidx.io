import { Icon } from 'antd'
import { shallow } from 'enzyme'
import * as React from 'react'

import UserNav from '@app/components/molecules/UserNav'
import LoginOrSignUp from '@app/components/molecules/UserNav/LoginOrSignUp'
import UserMenu from '@app/components/molecules/UserNav/UserMenu'

describe('UserNav', () => {
  it('renders a loading icon when the loading prop is true', () => {
    const wrapper = shallow(<UserNav loading viewer={null} signedIn={false} />)
    expect(wrapper.contains(<Icon type="loading" />)).toBeTruthy()
  })

  it('renders a UserMenu component', () => {
    const wrapper = shallow(
      <UserNav loading={false} viewer={{ id: 'id', uid: 'foo' }} signedIn />,
    )
    expect(wrapper.contains(<UserMenu displayName="foo" />)).toBeTruthy()
  })

  it('renders a LoginOrSignUp component', () => {
    const wrapper = shallow(
      <UserNav loading={false} viewer={null} signedIn={false} />,
    )
    expect(wrapper.contains(<LoginOrSignUp />)).toBeTruthy()
  })
})
