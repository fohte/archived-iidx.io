import * as React from 'react'
import * as renderer from 'react-test-renderer'

import LoginOrSignUpForm from '@app/components/organisms/LoginOrSignUpForm'

describe('LoginOrSignUpForm', () => {
  it('renders correctly', () => {
    const component = renderer.create(<LoginOrSignUpForm submitText="Log in" />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
