import * as React from 'react'
import { Label, SemanticCOLORS } from 'semantic-ui-react'

import { ClearLamp } from '@app/queries'

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

const clearLampColors: { [key in ClearLamp]: SemanticCOLORS } = {
  [ClearLamp.Failed]: 'black',
  [ClearLamp.Assist]: 'purple',
  [ClearLamp.Easy]: 'green',
  [ClearLamp.Normal]: 'blue',
  [ClearLamp.Hard]: 'red',
  [ClearLamp.ExHard]: 'yellow',
  [ClearLamp.FullCombo]: 'teal',
}

const GradeLabel: React.SFC<Props> = ({ clearLamp }) => (
  <Label horizontal color={clearLamp ? clearLampColors[clearLamp] : 'grey'}>
    {clearLamp ? clearLampTexts[clearLamp] : 'NO PLAY'}
  </Label>
)

export default GradeLabel
