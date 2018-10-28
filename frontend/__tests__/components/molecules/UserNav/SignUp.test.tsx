import * as React from 'react'
import * as renderer from 'react-test-renderer'

import SignUp from '@app/components/molecules/UserNav/SignUp'

describe('SignUp', () => {
  it('renders correctly', () => {
    const component = renderer.create(<SignUp />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
