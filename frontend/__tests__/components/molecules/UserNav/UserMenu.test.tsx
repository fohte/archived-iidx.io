import * as React from 'react'
import * as renderer from 'react-test-renderer'

import UserMenu from '@app/components/molecules/UserNav/UserMenu'

describe('UserMenu', () => {
  it('renders correctly', () => {
    const component = renderer.create(<UserMenu displayName="foobar" />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
