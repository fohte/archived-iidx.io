import * as _ from 'lodash'

export enum Grade {
  Max = 'MAX',
  A = 'A',
  AA = 'AA',
  AAA = 'AAA',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
}

export interface GradeDiff {
  grade: Grade | null
  diff: number
}

export const calcScoreRate = (
  score: number,
  numNotes: number,
  precision: number = 2,
) => _.round((score / (numNotes * 2)) * 100, precision)

export const calcGradeBorder = (coefficients: number, numNotes: number) =>
  Math.ceil(numNotes * 2 * coefficients)

export const getGradeBorders = (
  numNotes: number,
): { [key in Grade]: number } => ({
  [Grade.F]: 0,
  [Grade.E]: calcGradeBorder(numNotes, 2 / 9),
  [Grade.D]: calcGradeBorder(numNotes, 3 / 9),
  [Grade.C]: calcGradeBorder(numNotes, 4 / 9),
  [Grade.B]: calcGradeBorder(numNotes, 5 / 9),
  [Grade.A]: calcGradeBorder(numNotes, 6 / 9),
  [Grade.AA]: calcGradeBorder(numNotes, 7 / 9),
  [Grade.AAA]: calcGradeBorder(numNotes, 8 / 9),
  [Grade.Max]: numNotes * 2,
})

export const defaultGradeDiff: GradeDiff = {
  grade: null,
  diff: 0,
}

export const searchGrade = (score: number, numNotes: number): GradeDiff => {
  if (numNotes * 2 === score) {
    return { grade: Grade.Max, diff: 0 }
  }

  const gradeBorders = getGradeBorders(numNotes)

  const diffs = _.mapValues(gradeBorders, border => score - border)
  const diffArray = _.toPairs(diffs) as Array<[Grade, number]>

  const nearest = _.minBy<[Grade, number]>(
    _.filter(diffArray, ([, diff]) => diff >= 0),
    ([, diff]) => Math.abs(diff),
  )

  if (!nearest) {
    return defaultGradeDiff
  }

  return { grade: nearest[0], diff: nearest[1] }
}

export const searchNextGrade = (score: number, numNotes: number): GradeDiff => {
  if (numNotes * 2 === score) {
    return { grade: Grade.Max, diff: 0 }
  }

  const gradeBorders = getGradeBorders(numNotes)

  const diffs = _.mapValues(gradeBorders, border => score - border)
  const diffArray = _.toPairs(diffs) as Array<[Grade, number]>

  const nearest = _.minBy<[Grade, number]>(
    _.filter(diffArray, ([grade, diff]) => diff < 0 && grade !== Grade.F),
    ([, diff]) => Math.abs(diff),
  )

  if (!nearest) {
    return defaultGradeDiff
  }

  return { grade: nearest[0], diff: nearest[1] }
}

export const isMax = ({ grade, diff }: GradeDiff): boolean =>
  grade === Grade.Max && diff === 0
