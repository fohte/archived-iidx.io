import * as _ from 'lodash'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import GradeLabelGroup, {
  Props,
} from '@app/components/molecules/GradeLabelGroup'
import { Grade } from '@app/lib/score'

describe('GradeLabelGroup', () => {
  const params: Array<Props & { description: string }> = [
    {
      description: 'when the current grade is MAX-0',
      current: { grade: Grade.Max, diff: 0 },
      next: { grade: Grade.Max, diff: 0 },
    },
    {
      description: 'when the current grade is AAA+100 and MAX-100',
      current: { grade: Grade.AAA, diff: 100 },
      next: { grade: Grade.Max, diff: -100 },
    },
    {
      description: 'when the current grade is AA+100 and AAA-100',
      current: { grade: Grade.AA, diff: 100 },
      next: { grade: Grade.AAA, diff: -100 },
    },
    {
      description: 'when the current grade is A+100 and AA-100',
      current: { grade: Grade.A, diff: 100 },
      next: { grade: Grade.AA, diff: -100 },
    },
    {
      description: 'when the current grade is B+100 and A-100',
      current: { grade: Grade.B, diff: 100 },
      next: { grade: Grade.A, diff: -100 },
    },
    {
      description: 'when the current grade is C+100 and B-100',
      current: { grade: Grade.C, diff: 100 },
      next: { grade: Grade.B, diff: -100 },
    },
    {
      description: 'when the current grade is D+100 and C-100',
      current: { grade: Grade.D, diff: 100 },
      next: { grade: Grade.C, diff: -100 },
    },
    {
      description: 'when the current grade is E+100 and D-100',
      current: { grade: Grade.E, diff: 100 },
      next: { grade: Grade.D, diff: -100 },
    },
    {
      description: 'when the current grade is F+100 and E-100',
      current: { grade: Grade.F, diff: 100 },
      next: { grade: Grade.E, diff: -100 },
    },
    {
      description: 'when the current grade is null',
      current: { grade: null, diff: 0 },
      next: { grade: null, diff: 0 },
    },
  ]

  params.forEach(({ description, current, next }) => {
    it(`renders correctly ${description}`, () => {
      const tree = renderer
        .create(<GradeLabelGroup current={current} next={next} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
