import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Footer from '@app/components/organisms/Footer'

describe('Footer', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Footer />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
