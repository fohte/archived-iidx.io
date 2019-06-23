import * as _ from 'lodash'
import ErrorPage from 'next/error'
import * as React from 'react'

import MusicsPage from '@app/components/pages/MusicsPage'
import ensureArray from '@app/lib/ensureArray'
import {
  parseDifficultyString,
  parsePlayStyleString,
} from '@app/lib/queryParamParser'
import throwSSRError from '@app/lib/throwSSRError'
import { PageComponentType } from '@app/pages/_app'
import { Difficulty, PlayStyle } from '@app/queries'

export type RequiredQuery = {
  screenName: string
  playStyle: string
}

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
    <MusicsPage
      screenName={screenName}
      title={title}
      playStyle={playStyle}
      difficulties={difficulties}
      levels={levels}
      page={page}
    />
  )
}

PageComponent.getInitialProps = ({ res, query }) => {
  if (!query.screenName || !query.playStyle) {
    throwSSRError(res, 404)
    return {}
  }

  return {
    screenName: query.screenName,
    title: query.title,
    playStyle: parsePlayStyleString(query.playStyle),
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
