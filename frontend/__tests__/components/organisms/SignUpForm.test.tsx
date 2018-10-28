import * as React from 'react'
import * as renderer from 'react-test-renderer'

import SignUpForm from '@app/components/organisms/SignUpForm'

describe('SignUpForm', () => {
  it('renders correctly', () => {
    const component = renderer.create(<SignUpForm />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
