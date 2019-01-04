import * as React from 'react'

import { Difficulty, PlayStyle } from '@app/queries'
import { colors } from '@app/styles'

export interface Props {
  difficulty: Difficulty
  playStyle: PlayStyle
}

const DifficultyText: React.SFC<Props> = ({ difficulty, playStyle }) => (
  <span style={{ color: colors.difficulty[difficulty] }}>
    [{playStyle.toUpperCase()}
    {difficulty[0].toUpperCase()}]
  </span>
)

export default DifficultyText
