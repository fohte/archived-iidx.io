import * as React from 'react'
import { Label } from 'semantic-ui-react'

import { ClearLamp } from '@app/queries'
import { colors } from '@app/styles'

export const formatNumber = (num: number): string =>
  num > 0 ? `+${num}` : `${num}`

export interface Props {
  clearLamp: ClearLamp | null
}

const clearLampTexts: { [key in ClearLamp]: string } = {
  [ClearLamp.Failed]: 'FAILED',
  [ClearLamp.Assist]: 'ASSIST',
  [ClearLamp.Easy]: 'EASY',
  [ClearLamp.Normal]: 'NORMAL',
  [ClearLamp.Hard]: 'HARD',
  [ClearLamp.ExHard]: 'EX HARD',
  [ClearLamp.FullCombo]: 'FULL COMBO',
}

const GradeLabel: React.SFC<Props> = ({ clearLamp }) => (
  <Label horizontal color={colors.clearLampAliases[clearLamp || 'default']}>
    {clearLamp ? clearLampTexts[clearLamp] : 'NO PLAY'}
  </Label>
)

export default GradeLabel
