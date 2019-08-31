import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Index from '@pages/index'

describe('/', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Index />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
