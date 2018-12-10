import * as React from 'react'

import GradeLabel from '@app/components/atoms/GradeLabel'
import NextGradeLabel from '@app/components/atoms/NextGradeLabel'
import { Grade, searchGrade, searchNextGrade } from '@app/lib/score'

export interface Props {
  score: number
  numNotes: number
}

const isMax = (grade: Grade | null, diff: number): boolean =>
  grade === Grade.Max && diff === 0

const GradeLabelGroup: React.SFC<Props> = ({ score, numNotes }) => {
  const [grade, diff] = searchGrade(score, numNotes)
  const [nextGrade, nextDiff] = searchNextGrade(score, numNotes)

  return (
    <span>
      {grade && <GradeLabel grade={grade} diff={diff} />}
      {nextGrade && !isMax(nextGrade, nextDiff) && (
        <NextGradeLabel grade={nextGrade} diff={nextDiff} />
      )}
    </span>
  )
}

export default GradeLabelGroup
