import _ from 'lodash'
import ErrorPage from 'next/error'
import * as React from 'react'

import ResultList from '@app/components/organisms/ResultList'
import { FormValues } from '@app/components/organisms/ResultSearchForm'
import UserProfileLayout, {
  Tab,
} from '@app/components/templates/UserProfileLayout'
import {
  parseDifficultyString,
  parsePlayStyleString,
} from '@app/lib/queryParamParser'
import throwSSRError from '@app/lib/throwSSRError'
import { PageComponentType } from '@app/pages/_app'
import { Difficulty, PlayStyle } from '@app/queries'
import { Router } from '@app/routes'

export type RequiredQuery = {
  screenName: string
}

export type OptionalQuery = {
  title?: string
  playStyle?: string
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

const compactFormValues = ({
  title,
  playStyle,
  difficulties,
  levels,
}: FormValues): Partial<FormValues> => {
  const newValues: Partial<FormValues> = { playStyle }

  if (title) {
    newValues.title = title
  }

  if (difficulties.length !== 0) {
    newValues.difficulties = difficulties
  }

  if (levels.length !== 0) {
    newValues.levels = levels
  }

  return newValues
}

const ensureArray = <T extends any>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value]

const MusicsPage: PageComponentType<Props, Props, Query> = ({
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

  const initialValues: FormValues =
    title == null &&
    playStyle == null &&
    (difficulties == null || difficulties.length === 0) &&
    (levels == null || levels.length === 0)
      ? {
          title: null,
          playStyle: PlayStyle.Sp,
          difficulties: [],
          levels: [12],
        }
      : {
          title: title || null,
          playStyle: playStyle || PlayStyle.Sp,
          difficulties: difficulties || [],
          levels: levels || [],
        }

  const replaceQuery = (newQuery: any) => {
    const currentQuery = _.omit(Router.query || {}, 'screenName')
    const query = { ...currentQuery, ...newQuery }

    // currently next-routes doesn't support array for query parameters,
    // so we use `Router.replace` instead of `Router.replaceRoute`.
    Router.replace(
      {
        pathname: '/musics',
        query: {
          ...query,
          screenName,
        },
      },
      {
        pathname: location.pathname,
        query,
      },
      { shallow: true },
    )
  }

  return (
    <UserProfileLayout screenName={screenName} activeTab={Tab.Musics}>
      <ResultList
        initialValues={initialValues}
        screenName={screenName}
        onSubmit={values => {
          const compactedFormValues = compactFormValues(values)
          replaceQuery({ ...compactedFormValues })
        }}
        onPageChange={newActivePage => {
          replaceQuery({ page: newActivePage })
        }}
        defaultActivePage={page}
      />
    </UserProfileLayout>
  )
}

MusicsPage.getInitialProps = ({ res, query }) => {
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

export default MusicsPage
