import * as _ from 'lodash'

import _ensureArray from '@app/lib/ensureArray'
import { Difficulty, Grade, PlayStyle } from '@app/queries'

type EnsureFunction<T> = (query: Query, name: string) => T

export function ensureArray<T>(
  ensureFunction: EnsureFunction<T>,
  query: Query,
  name: string,
): T[] {
  return _ensureArray(query).map(q => ensureFunction(q, name))
}

type Query = string | string[] | undefined

const ensureNonMaybe: EnsureFunction<string | string[]> = (query, name) => {
  if (query == null) {
    throw new Error(`${name} should not be null or undefined`)
  }
  return query
}

export const ensureString: EnsureFunction<string> = (query, name) => {
  const q = ensureNonMaybe(query, name)

  if (Array.isArray(q)) {
    if (q.length === 0) {
      throw new Error(`${name} should not be empty array`)
    }

    return q[0]
  }

  return q
}

export const ensureInteger: EnsureFunction<number> = (query, name) => {
  const q = parseInt(ensureString(query, name), 10)

  if (Number.isNaN(q)) {
    throw new Error(`${name} should be integer`)
  }

  return q
}

function createEnumFunction<T extends any>(
  enumObj: { [key in string]: any },
): EnsureFunction<T> {
  const ensureFunction: EnsureFunction<T> = (query, name) => {
    const normalizedQuery = ensureString(query, name).toUpperCase()

    const value = _.values(enumObj).find(v => v === normalizedQuery)

    if (value == null) {
      throw new Error(`${name} is invalid value`)
    }

    return value
  }

  return ensureFunction
}

export const ensurePlayStyle = createEnumFunction<PlayStyle>(PlayStyle)
export const ensureDifficulty = createEnumFunction<Difficulty>(Difficulty)
export const ensureGrade = createEnumFunction<Grade>(Grade)
