import * as React from 'react'
import * as renderer from 'react-test-renderer'

import UserNav from '@app/components/molecules/UserNav'

describe('UserNav', () => {
  it('renders a loading icon when the loading prop is true', () => {
    const component = renderer.create(
      <UserNav loading viewer={null} signedIn={false} />,
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders a UserMenu component', () => {
    const component = renderer.create(
      <UserNav
        loading={false}
        viewer={{ __typename: 'User', id: 'id', name: 'foo' }}
        signedIn
      />,
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders a Login component and a SignUp component', () => {
    const component = renderer.create(
      <UserNav loading={false} viewer={null} signedIn={false} />,
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
