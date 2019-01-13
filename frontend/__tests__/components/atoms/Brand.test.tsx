import { shallow } from 'enzyme'
import * as React from 'react'

import Brand from '@app/components/atoms/Brand'

describe('Brand', () => {
  it('renders the brand', () => {
    const brand = shallow(<Brand />)
    expect(brand.text()).toEqual('iidx.io')
  })
})
