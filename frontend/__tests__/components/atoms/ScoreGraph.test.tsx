import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ScoreGraph, { Props } from '@app/components/atoms/ScoreGraph'
import { Grade } from '@app/lib/score'

describe('ScoreGraph', () => {
  const params: Props[] = [
    { grade: Grade.Max, scoreRate: 100 },
    { grade: Grade.AAA, scoreRate: Math.ceil((8 / 9) * 100) },
    { grade: Grade.AA, scoreRate: Math.ceil((7 / 9) * 100) },
    { grade: Grade.A, scoreRate: Math.ceil((6 / 9) * 100) },
    { grade: Grade.B, scoreRate: Math.ceil((5 / 9) * 100) },
    { grade: Grade.C, scoreRate: Math.ceil((4 / 9) * 100) },
    { grade: Grade.D, scoreRate: Math.ceil((3 / 9) * 100) },
    { grade: Grade.E, scoreRate: Math.ceil((2 / 9) * 100) },
    { grade: Grade.F, scoreRate: Math.ceil((1 / 9) * 100) },
    { grade: null, scoreRate: 0 },
  ]

  params.forEach(({ grade, scoreRate }) => {
    it(`renders correctly when grade is ${grade} and score rate is ${scoreRate}`, () => {
      const tree = renderer
        .create(<ScoreGraph grade={grade} scoreRate={scoreRate} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
