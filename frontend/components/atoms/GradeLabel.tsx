import * as React from 'react'
import { Label, SemanticCOLORS } from 'semantic-ui-react'

import { Grade } from '@app/lib/score'

export const formatNumber = (num: number): string =>
  num > 0 ? `+${num}` : `${num}`

export interface Props {
  grade: Grade
  diff: number
}

const labelColors: { [key in Grade]: SemanticCOLORS } = {
  [Grade.F]: 'black',
  [Grade.E]: 'black',
  [Grade.D]: 'black',
  [Grade.C]: 'black',
  [Grade.B]: 'black',
  [Grade.A]: 'blue',
  [Grade.AA]: 'olive',
  [Grade.AAA]: 'orange',
  [Grade.Max]: 'red',
}

const GradeLabel: React.SFC<Props> = ({ grade, diff }) => {
  return (
    <Label horizontal color={labelColors[grade || Grade.F]}>
      {grade}
      <Label.Detail>{formatNumber(diff)}</Label.Detail>
    </Label>
  )
}

export default GradeLabel
