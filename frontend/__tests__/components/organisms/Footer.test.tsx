import { advanceTo } from 'jest-date-mock'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Footer from '@app/components/organisms/Footer'

describe('Footer', () => {
  it('renders correctly when the current year and the copyright year are the same', () => {
    advanceTo(new Date(2018, 1, 1, 0, 0, 0))

    const component = renderer.create(<Footer />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when the current year and the copyright year are different', () => {
    advanceTo(new Date(2019, 1, 1, 0, 0, 0))

    const component = renderer.create(<Footer />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
