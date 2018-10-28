import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Login from '@app/components/molecules/UserNav/Login'

describe('Login', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Login />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
