import { Difficulty, PlayStyle } from '@app/queries'

const pascalize = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`

export const parsePlayStyleString = (
  playStyle: string,
): PlayStyle | undefined =>
  PlayStyle[pascalize(playStyle) as keyof typeof PlayStyle]

export const parseDifficultyString = (
  difficulty: string,
): Difficulty | undefined =>
  Difficulty[pascalize(difficulty) as keyof typeof Difficulty]
