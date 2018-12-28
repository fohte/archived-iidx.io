import * as _ from 'lodash'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import GradeLabel from '@app/components/atoms/GradeLabel'
import { Grade } from '@app/lib/score'

describe('GradeLabel', () => {
  _.forEach(Grade, grade => {
    it(`renders correctly when clear lamp is ${grade}`, () => {
      const tree = renderer
        .create(<GradeLabel grade={grade} diff={0} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  it(`renders correctly when clear lamp is null`, () => {
    const tree = renderer.create(<GradeLabel grade={null} diff={0} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when diff is greater than 0', () => {
    const tree = renderer
      .create(<GradeLabel grade={Grade.AAA} diff={1} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when diff is 0', () => {
    const tree = renderer
      .create(<GradeLabel grade={Grade.AAA} diff={0} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when diff is less than 0', () => {
    const tree = renderer
      .create(<GradeLabel grade={Grade.AAA} diff={-1} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
