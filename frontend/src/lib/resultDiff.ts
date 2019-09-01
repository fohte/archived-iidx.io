import { Result } from '@app/queries'

export type DifferableAttributes = 'score' | 'scoreRate' | 'bpi' | 'missCount'
export type DifferableResult<T extends DifferableAttributes> =
  | Pick<Result, T>
  | null
  | undefined

function findValue<T extends DifferableAttributes>(
  result: DifferableResult<T>,
  attribute: T,
): number {
  if (result == null) {
    return 0
  }

  const value = result[attribute]
  return value == null ? 0 : (value as number)
}

function calcDiff<T extends DifferableAttributes>(
  baseResult: DifferableResult<T>,
  targetResult: DifferableResult<T>,
  attribute: T,
): number {
  const base = findValue(baseResult, attribute)
  const target = findValue(targetResult, attribute)

  return base - target
}

type DiffFunction<T extends DifferableAttributes> = (
  baseResult: DifferableResult<T>,
  targetResult: DifferableResult<T>,
) => number

function makeDiffFunction<T extends DifferableAttributes>(
  attribute: T,
): DiffFunction<T> {
  return (baseResult: DifferableResult<T>, targetResult: DifferableResult<T>) =>
    calcDiff(baseResult, targetResult, attribute)
}

export default {
  score: makeDiffFunction('score'),
  scoreRate: makeDiffFunction('scoreRate'),
  bpi: makeDiffFunction('bpi'),
  missCount: makeDiffFunction('missCount'),
}

export const formatDiff = (diff: number, digit?: number): string => {
  const plusMinus = diff >= 0 ? '+' : '-'
  const num = Math.abs(diff).toFixed(digit)

  return `${plusMinus}${num}`
}
