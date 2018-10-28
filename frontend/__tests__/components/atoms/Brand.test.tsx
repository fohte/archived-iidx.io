import { shallow } from 'enzyme'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Brand from '@app/components/atoms/Brand'

describe('Brand', () => {
  it('renders the brand', () => {
    const brand = shallow(<Brand />)
    expect(brand.text()).toEqual('iidx.io')
  })

  it('renders correctly', () => {
    const tree = renderer.create(<Brand />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
