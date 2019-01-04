import * as _ from 'lodash'
import { SemanticCOLORS } from 'semantic-ui-react'

import { Grade } from '@app/lib/score'
import { ClearLamp, Difficulty } from '@app/queries'

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

const convertAliasesToCodes = <T extends string>(
  aliases: { [key in T]: SemanticCOLORS },
): { [key in T]: string } =>
  _.mapValues(aliases, (key: keyof typeof base) => base[key]) as {
    [key in T]: string
  }

type WithDefault<T> = T | 'default'

export type GradeKeys = WithDefault<Grade>

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

export const grade = convertAliasesToCodes(gradeAliases)

export type ClearLampKeys = WithDefault<ClearLamp>

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

export const clearLamp = convertAliasesToCodes(clearLampAliases)

export const difficultyAliases: { [key in Difficulty]: SemanticCOLORS } = {
  [Difficulty.Another]: 'red',
  [Difficulty.Hyper]: 'orange',
  [Difficulty.Normal]: 'blue',
}

export const difficulty = convertAliasesToCodes(difficultyAliases)
