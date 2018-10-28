import * as React from 'react'
import * as renderer from 'react-test-renderer'

import MainLayout from '@app/components/templates/MainLayout'

describe('MainLayout', () => {
  it('renders correctly', () => {
    const component = renderer.create(<MainLayout />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
