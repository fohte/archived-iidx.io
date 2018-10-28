import * as React from 'react'
import * as renderer from 'react-test-renderer'

import LoginForm from '@app/components/organisms/LoginForm'

describe('LoginForm', () => {
  it('renders correctly', () => {
    const component = renderer.create(<LoginForm />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
