import * as React from 'react'
import { Label } from 'semantic-ui-react'

import { formatNumber } from '@app/components/atoms/GradeLabel'
import { Grade } from '@app/lib/score'

export interface Props {
  grade: Grade
  diff: number
}

const NextGradeLabel: React.SFC<Props> = ({ grade, diff }) => (
  <Label horizontal>
    Next
    <Label.Detail>
      {grade} {formatNumber(diff)}
    </Label.Detail>
  </Label>
)

export default NextGradeLabel
