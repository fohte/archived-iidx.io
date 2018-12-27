import * as _ from 'lodash'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ClearLampLabel from '@app/components/atoms/ClearLampLabel'
import { ClearLamp } from '@app/queries'

describe('ClearLampLabel', () => {
  _.forEach(ClearLamp, clearLamp => {
    it(`renders correctly when clear lamp is ${clearLamp}`, () => {
      const tree = renderer
        .create(<ClearLampLabel clearLamp={clearLamp} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  it(`renders correctly when clear lamp is null`, () => {
    const tree = renderer.create(<ClearLampLabel clearLamp={null} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
