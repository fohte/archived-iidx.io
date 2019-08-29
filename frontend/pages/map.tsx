import * as React from 'react'

import MapPage from '@app/components/pages/MapPage'
import {
  ensureDifficulty,
  ensureInteger,
  ensurePlayStyle,
  ensureString,
} from '@app/lib/queryParamParser'
import throwSSRError from '@app/lib/throwSSRError'
import useServerResponse from '@app/lib/useServerResponse'
import { PageComponentType } from '@pages/_app'
import { Difficulty, PlayStyle } from '@app/queries'

// interface だと Record 型を満たさないので注意
// eslint-disable-next-line @typescript-eslint/prefer-interface
export type Query = {
  screenName: string
  musicNumber: string
  playStyle: string
  difficulty: string
}

export type WithErrorState<P> = { error: true } | ({ error: false } & P)

export interface NormalProps {
  musicNumber: number
  playStyle: PlayStyle
  difficulty: Difficulty
  screenName: string
}

export type Props = WithErrorState<NormalProps>

// FIXME: PageComponentType の型で Props を指定すると型エラーに
// なってしまうので any にしている
const NextMapPage: PageComponentType<any> = props => {
  const { setStatus } = useServerResponse()

  if (props.error) {
    setStatus(404)
    return null
  }

  const { error, ...mapPageProps } = props

  return <MapPage {...mapPageProps} />
}

NextMapPage.getInitialProps = async ({ res, query }) => {
  let playStyle: PlayStyle
  let difficulty: Difficulty
  let screenName: string
  let musicNumber: number

  try {
    playStyle = ensurePlayStyle(query.playStyle, 'playStyle')
    difficulty = ensureDifficulty(query.difficulty, 'difficulty')
    screenName = ensureString(query.screenName, 'screenName')
    musicNumber = ensureInteger(query.musicNumber, 'musicNumber')
  } catch (e) {
    throwSSRError(res, 404)
    console.error(e)
    return { error: true }
  }

  return {
    error: false,
    musicNumber,
    playStyle,
    difficulty,
    screenName,
  }
}

export default NextMapPage
