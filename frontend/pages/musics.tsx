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
  ensureGrade,
  ensureString,
} from '@app/lib/queryParamParser'
import throwSSRError from '@app/lib/throwSSRError'
import { PageComponentType } from '@pages/_app'
import { Difficulty, Grade, PlayStyle } from '@app/queries'

export type RequiredQuery = 'screenName' | 'playStyle'

export type OptionalQuery =
  | 'title'
  | 'difficulties'
  | 'levels'
  | 'grades'
  | 'onlyUpdated'
  | 'updatedOn'
  | 'page'

export type Query = { [key in RequiredQuery]: string } &
  { [key in OptionalQuery]: string | string[] | undefined }

export interface Props {
  screenName?: string
  title?: string
  playStyle?: PlayStyle
  difficulties?: Difficulty[]
  levels?: number[]
  grades?: Grade[]
  onlyUpdated?: boolean
  updatedOn?: string
  page?: number
}

const PageComponent: PageComponentType<Props> = ({
  screenName,
  title,
  playStyle,
  difficulties,
  levels,
  grades,
  onlyUpdated,
  updatedOn,
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
        grades={grades}
        onlyUpdated={!!onlyUpdated}
        updatedOn={updatedOn ? new Date(Date.parse(updatedOn)) : undefined}
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
  let grades: Grade[]
  let onlyUpdated: boolean
  // getInitialProps では Date 型を返却できないのでここでは string を返す
  // @see https://github.com/zeit/next.js/issues/6917
  let updatedOn: string | undefined
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
    grades = ensureArray(ensureGrade, query.grades, 'grades')
    onlyUpdated = query.onlyUpdated
      ? ensureString(query.onlyUpdated, 'onlyUpdated') === 'true'
      : false
    updatedOn = query.updatedOn
      ? ensureString(query.updatedOn, 'updatedOn')
      : undefined
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
    grades,
    onlyUpdated,
    updatedOn,
    page,
  }
}

export default PageComponent
