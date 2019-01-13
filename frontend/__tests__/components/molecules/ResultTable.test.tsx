import { mount } from 'enzyme'
import * as React from 'react'

import ResultTable, { Map } from '@app/components/molecules/ResultTable'
import { Difficulty, PlayStyle } from '@app/queries'

describe('ResultTable', () => {
  const makeMap = (map?: Partial<Map>): Map => ({
    numNotes: 1000,
    level: 12,
    difficulty: Difficulty.Another,
    playStyle: PlayStyle.Sp,
    ...map,
  })

  it('calls onClickRow when the row is clicked', () => {
    const map = makeMap()
    const onClickRow = jest.fn()
    const wrapper = mount(<ResultTable maps={[map]} onClickRow={onClickRow} />)

    wrapper
      .find('tbody tr')
      .first()
      .simulate('click')

    expect(onClickRow).toHaveBeenCalledWith(map)
  })
})
