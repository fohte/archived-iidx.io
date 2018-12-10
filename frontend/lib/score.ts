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

export const calcScoreRate = (
  score: number,
  numNotes: number,
  precision: number = 2,
) => _.round((score / (numNotes * 2)) * 100, precision)

const getGradeBorders = (numNotes: number): { [key in Grade]: number } => {
  const maxScore = numNotes * 2
  const calcGradeBorder = (coefficients: number): number =>
    Math.ceil(maxScore * coefficients)

  return {
    [Grade.F]: 0,
    [Grade.E]: calcGradeBorder(2 / 9),
    [Grade.D]: calcGradeBorder(3 / 9),
    [Grade.C]: calcGradeBorder(4 / 9),
    [Grade.B]: calcGradeBorder(5 / 9),
    [Grade.A]: calcGradeBorder(6 / 9),
    [Grade.AA]: calcGradeBorder(7 / 9),
    [Grade.AAA]: calcGradeBorder(8 / 9),
    [Grade.Max]: maxScore,
  }
}

export const searchGrade = (
  score: number,
  numNotes: number,
): [Grade | null, number] => {
  if (numNotes * 2 === score) {
    return [Grade.Max, 0]
  }

  const gradeBorders = getGradeBorders(numNotes)

  const diffs = _.mapValues(gradeBorders, border => score - border)
  const diffArray = _.toPairs(diffs) as Array<[Grade, number]>

  const nearest = _.minBy<[Grade, number]>(
    _.filter(diffArray, ([, diff]) => diff >= 0),
    ([, diff]) => Math.abs(diff),
  )

  return nearest || [null, 0]
}

export const searchNextGrade = (
  score: number,
  numNotes: number,
): [Grade | null, number] => {
  if (numNotes * 2 === score) {
    return [Grade.Max, 0]
  }

  const gradeBorders = getGradeBorders(numNotes)

  const diffs = _.mapValues(gradeBorders, border => score - border)
  const diffArray = _.toPairs(diffs) as Array<[Grade, number]>

  const nearest = _.minBy<[Grade, number]>(
    _.filter(diffArray, ([grade, diff]) => diff < 0 && grade !== Grade.F),
    ([, diff]) => Math.abs(diff),
  )

  return nearest || [null, 0]
}
