import * as _ from 'lodash'
import ErrorPage from 'next/error'
import Head from 'next/head'
import * as React from 'react'

import MusicsPage from '@app/components/pages/MusicsPage'
import {
  ensureArray,
  ensureDifficulty,
  ensureInteger,
  ensurePlayStyle,
  ensureString,
} from '@app/lib/queryParamParser'
import throwSSRError from '@app/lib/throwSSRError'
import { PageComponentType } from '@app/pages/_app'
import { Difficulty, PlayStyle } from '@app/queries'

// interface だと Record 型を満たさないので注意
// eslint-disable-next-line @typescript-eslint/prefer-interface
export type RequiredQuery = {
  screenName: string
  playStyle: string
}

// interface だと Record 型を満たさないので注意
// eslint-disable-next-line @typescript-eslint/prefer-interface
export type OptionalQuery = {
  title?: string
  difficulties?: string | string[]
  levels?: string | string[]
  page?: string
}

export type Query = RequiredQuery & OptionalQuery

export interface Props {
  screenName?: string
  title?: string
  playStyle?: PlayStyle
  difficulties?: Difficulty[]
  levels?: number[]
  page?: number
}

const PageComponent: PageComponentType<Props, Props, Query> = ({
  screenName,
  title,
  playStyle,
  difficulties,
  levels,
  page,
}: Props) => {
  if (!screenName || !playStyle) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>@{screenName} - Musics | iidx.io</title>
      </Head>
      <MusicsPage
        screenName={screenName}
        title={title}
        playStyle={playStyle}
        difficulties={difficulties}
        levels={levels}
        page={page}
      />
    </>
  )
}

PageComponent.getInitialProps = ({ res, query }) => {
  let playStyle: PlayStyle
  let screenName: string
  let title: string | undefined
  let difficulties: Difficulty[]
  let levels: number[]
  let page: number

  try {
    playStyle = ensurePlayStyle(query.playStyle, 'playStyle')
    screenName = ensureString(query.screenName, 'screenName')
    title = query.title ? ensureString(query.title, 'title') : undefined
    difficulties = ensureArray(
      ensureDifficulty,
      query.difficulties,
      'difficulties',
    )
    levels = ensureArray(ensureInteger, query.levels, 'levels')
    page = query.page ? ensureInteger(query.page, 'page') : 1
  } catch (e) {
    throwSSRError(res, 404)
    console.error(e)
    return {}
  }

  return {
    screenName,
    title,
    playStyle,
    difficulties,
    levels,
    page,
  }
}

export default PageComponent
