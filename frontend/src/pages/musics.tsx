import * as _ from 'lodash'
import ErrorPage from 'next/error'
import * as React from 'react'

import MusicFoldersPage from '@app/components/pages/MusicFoldersPage'
import MusicsPage from '@app/components/pages/MusicsPage'
import {
  parseDifficultyString,
  parsePlayStyleString,
} from '@app/lib/queryParamParser'
import throwSSRError from '@app/lib/throwSSRError'
import { PageComponentType } from '@app/pages/_app'
import { Difficulty, PlayStyle } from '@app/queries'

export type RequiredQuery = {
  screenName: string
}

export type SearchQuery = {
  title?: string
  playStyle?: string
  difficulties?: string | string[]
  levels?: string | string[]
}

export type OptionalQuery = SearchQuery & {
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
  if (!screenName) {
    return <ErrorPage statusCode={404} />
  }

  const isQueryEmpty =
    title == null &&
    playStyle == null &&
    (difficulties == null || difficulties.length === 0) &&
    (levels == null || levels.length === 0)

  return isQueryEmpty ? (
    <MusicFoldersPage screenName={screenName} />
  ) : (
    <MusicsPage
      isQueryEmpty={isQueryEmpty}
      screenName={screenName}
      title={title}
      playStyle={playStyle}
      difficulties={difficulties}
      levels={levels}
      page={page}
    />
  )
}

const ensureArray = <T extends any>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value]

PageComponent.getInitialProps = ({ res, query }) => {
  if (!query.screenName) {
    throwSSRError(res, 404)
    return {}
  }

  return {
    screenName: query.screenName,
    title: query.title,
    playStyle:
      query.playStyle != null
        ? parsePlayStyleString(query.playStyle)
        : query.playStyle,
    difficulties: ensureArray(query.difficulties || [])
      .map(d => parseDifficultyString(d))
      .filter(d => d) as Difficulty[],
    levels: ensureArray(query.levels || [])
      .map(level => Number(level))
      .filter(l => l),
    page: query.page ? Number(query.page) : 1,
  }
}

export default PageComponent
