import * as React from 'react'

import GradeLabel from '@app/components/atoms/GradeLabel'
import NextGradeLabel from '@app/components/atoms/NextGradeLabel'
import { GradeDiff, isMax } from '@app/lib/score'

export interface Props {
  current: GradeDiff
  next: GradeDiff
}

const GradeLabelGroup: React.SFC<Props> = ({ current, next }) => {
  return (
    <>
      <div style={{ marginBottom: '0.3em' }}>
        <GradeLabel grade={current.grade} diff={current.diff} />
      </div>
      {next.grade && !isMax(next) && (
        <div>
          <NextGradeLabel grade={next.grade} diff={next.diff} />
        </div>
      )}
    </>
  )
}

export default GradeLabelGroup
