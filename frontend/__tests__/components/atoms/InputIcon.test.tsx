import * as React from 'react'
import * as renderer from 'react-test-renderer'

import InputIcon from '@app/components/atoms/InputIcon'

describe('InputIcon', () => {
  it('renders correctly', () => {
    const component = renderer.create(<InputIcon type="mail" />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
