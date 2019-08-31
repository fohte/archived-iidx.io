import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Login from '@pages/login'

describe('/login', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Login />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
