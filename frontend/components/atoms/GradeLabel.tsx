import * as React from 'react'
import { Label } from 'semantic-ui-react'

import { Grade } from '@app/lib/score'
import { colors } from '@app/styles'

export const formatNumber = (num: number): string =>
  num > 0 ? `+${num}` : `${num}`

export interface Props {
  grade: Grade
  diff: number
}

const GradeLabel: React.SFC<Props> = ({ grade, diff }) => {
  return (
    <Label horizontal color={colors.gradeAliases[grade || 'default']}>
      {grade}
      <Label.Detail>{formatNumber(diff)}</Label.Detail>
    </Label>
  )
}

export default GradeLabel
