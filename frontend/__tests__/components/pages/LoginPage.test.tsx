import * as React from 'react'
import * as renderer from 'react-test-renderer'

import LoginPage from '@app/components/pages/LoginPage'

describe('LoginPage', () => {
  it('renders correctly', () => {
    const component = renderer.create(<LoginPage />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
