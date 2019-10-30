import { Difficulty, PlayStyle } from '@app/queries'

type PlaySideOptions =
  | { playStyle: PlayStyle.Sp; playSide: 1 | 2 }
  | { playStyle: PlayStyle.Dp }

interface Music {
  series: number
  textageUid: string
}

interface Map {
  level: number
  difficulty: Difficulty
}

const getPlaySideId = (playSideOpts: PlaySideOptions) =>
  playSideOpts.playStyle === PlayStyle.Sp ? playSideOpts.playSide : 'D'

const getDifficultyId = (difficulty: Difficulty) =>
  difficulty === Difficulty.Leggendaria ? 'X' : difficulty[0]

const getLevelId = (level: number) => level.toString(16).toUpperCase()

export const generateTextageURL = (
  { series, textageUid }: Music,
  { level, difficulty }: Map,
  playSideOpts: PlaySideOptions,
) =>
  `http://textage.cc/score/${series}/${textageUid}.html?${getPlaySideId(
    playSideOpts,
  )}${getDifficultyId(difficulty)}${getLevelId(level)}00`
