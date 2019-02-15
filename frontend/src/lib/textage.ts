import { Difficulty, PlayStyle } from '@app/queries'

type PlaySideOptions =
  | { playStyle: PlayStyle.Sp; playSide: 1 | 2 }
  | { playStyle: PlayStyle.Dp }

type Music = {
  series: number
  textageUid: string
}

type Map = {
  level: number
  difficulty: Difficulty
}

export const generateTextageURL = (
  { series, textageUid }: Music,
  { level, difficulty }: Map,
  playSideOpts: PlaySideOptions,
) =>
  `http://textage.cc/score/${series}/${textageUid}.html?${getPlaySideId(
    playSideOpts,
  )}${getDifficultyId(difficulty)}${getLevelId(level)}00`

const getPlaySideId = (playSideOpts: PlaySideOptions) =>
  playSideOpts.playStyle === PlayStyle.Sp ? playSideOpts.playSide : 'D'

const getDifficultyId = (difficulty: Difficulty) => difficulty[0]

const getLevelId = (level: number) => level.toString(16).toUpperCase()
