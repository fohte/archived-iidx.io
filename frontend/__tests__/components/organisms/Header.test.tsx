import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Header from '@app/components/organisms/Header'

describe('Header', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Header />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
