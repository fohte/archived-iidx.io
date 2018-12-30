import * as _ from 'lodash'
import { SemanticCOLORS } from 'semantic-ui-react'

import { Grade } from '@app/lib/score'
import { ClearLamp } from '@app/queries'

export const base: { [key in SemanticCOLORS]: string } = {
  red: '#DB2828',
  orange: '#F2711C',
  yellow: '#FBBD08',
  olive: '#B5CC18',
  green: '#21BA45',
  teal: '#00B5AD',
  blue: '#2185D0',
  violet: '#6435C9',
  purple: '#A333C8',
  pink: '#E03997',
  brown: '#A5673F',
  grey: '#767676',
  black: '#1B1C1D',
}

export type GradeKeys = Grade | 'default'

export const gradeAliases: { [key in GradeKeys]: SemanticCOLORS } = {
  [Grade.F]: 'black',
  [Grade.E]: 'black',
  [Grade.D]: 'black',
  [Grade.C]: 'black',
  [Grade.B]: 'black',
  [Grade.A]: 'blue',
  [Grade.AA]: 'olive',
  [Grade.AAA]: 'orange',
  [Grade.Max]: 'red',
  default: 'black',
}

export const grade = _.mapValues(gradeAliases, key => base[key]) as {
  [key in GradeKeys]: string
}

export type ClearLampKeys = ClearLamp | 'default'

export const clearLampAliases: { [key in ClearLampKeys]: SemanticCOLORS } = {
  [ClearLamp.Failed]: 'black',
  [ClearLamp.Assist]: 'purple',
  [ClearLamp.Easy]: 'green',
  [ClearLamp.Normal]: 'blue',
  [ClearLamp.Hard]: 'red',
  [ClearLamp.ExHard]: 'yellow',
  [ClearLamp.FullCombo]: 'teal',
  default: 'grey',
}

export const clearLamp = _.mapValues(clearLampAliases, key => base[key]) as {
  [key in ClearLampKeys]: string
}
