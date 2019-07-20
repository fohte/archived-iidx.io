import _ensureArray from '@app/lib/ensureArray'
import { Difficulty, PlayStyle } from '@app/queries'

type EnsureFunction<T> = (query: Query, name: string) => T

export function ensureArray<T>(
  ensureFunction: EnsureFunction<T>,
  query: Query,
  name: string,
): T[] {
  return _ensureArray(query).map(q => ensureFunction(q, name))
}

type Query = string | string[] | undefined

const pascalize = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`

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

export const ensurePlayStyle: EnsureFunction<PlayStyle> = (query, name) => {
  const key = pascalize(ensureString(query, name))

  if (!(key in PlayStyle)) {
    throw new Error(`${name} is invalid value`)
  }

  return PlayStyle[key as keyof typeof PlayStyle]
}

export const ensureDifficulty: EnsureFunction<Difficulty> = (query, name) => {
  const key = pascalize(ensureString(query, name))

  if (!(key in Difficulty)) {
    throw new Error(`${name} is invalid value`)
  }

  return Difficulty[key as keyof typeof Difficulty]
}
