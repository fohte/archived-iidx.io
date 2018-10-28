import * as React from 'react'
import * as renderer from 'react-test-renderer'

import RegisterForm from '@app/components/organisms/RegisterForm'

describe('RegisterForm', () => {
  it('renders correctly', () => {
    const component = renderer.create(<RegisterForm />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
