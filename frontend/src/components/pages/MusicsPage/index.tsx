import * as _ from 'lodash'
import * as React from 'react'

import { FormValues } from '@app/components/organisms/FilterForm'
import ResultList from '@app/components/organisms/ResultList'
import ResultSearchForm from '@app/components/organisms/ResultSearchForm'
import UserProfileLayout, {
  Tab,
} from '@app/components/templates/UserProfileLayout'
import ensureArray from '@app/lib/ensureArray'
import { Difficulty, PlayStyle } from '@app/queries'
import { Router } from '@app/routes'

export interface Props {
  screenName: string
  title?: string
  playStyle: PlayStyle
  difficulties?: Difficulty[]
  levels?: number[]
  page?: number
}

const compactFormValues = ({
  title,
  difficulties,
  levels,
}: FormValues): Partial<FormValues> => {
  const newValues: Partial<FormValues> = {}

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

const MusicsPage = ({
  screenName,
  title,
  playStyle,
  difficulties,
  levels,
  page,
}: Props) => {
  const isQueryEmpty =
    title == null &&
    (difficulties == null || difficulties.length === 0) &&
    (levels == null || levels.length === 0)

  const formValues: FormValues = isQueryEmpty
    ? {
        title: null,
        difficulties: [],
        levels: [12],
      }
    : {
        title: title || null,
        difficulties: difficulties || [],
        levels: levels || [],
      }

  const changeRoute = (query: any, { replace }: { replace: boolean }) => {
    if (query.difficulties && query.difficulties.length !== 0) {
      query.difficulties = ensureArray(query.difficulties).map(
        (d: Difficulty) => d.toLowerCase(),
      )
    }

    if (query.playStyle) {
      query.playStyle = (query.playStyle as PlayStyle).toLowerCase()
    }

    // page が 1 (初期値) のときは正規化する
    if (query.page === 1) {
      delete query.page
    }

    const routerMethod = replace ? Router.replace : Router.push

    // currently next-routes doesn't support array for query parameters,
    // so we use `Router.replace` instead of `Router.replaceRoute`.
    routerMethod(
      {
        pathname: '/musics',
        query: {
          ...query,
          screenName,
          playStyle,
        },
      },
      {
        pathname: location.pathname,
        query,
      },
      { shallow: replace },
    )
  }

  return (
    <UserProfileLayout
      screenName={screenName}
      playStyle={playStyle}
      activeTab={Tab.Musics}
    >
      <ResultSearchForm
        formValues={formValues}
        onSubmit={values => {
          const compactedFormValues = compactFormValues(values)
          changeRoute({ page: 1, ...compactedFormValues }, { replace: false })
        }}
      />
      <ResultList
        screenName={screenName}
        formValues={formValues}
        playStyle={playStyle}
        onPageChange={newActivePage => {
          changeRoute({ page: newActivePage }, { replace: true })
        }}
        defaultActivePage={page}
      />
    </UserProfileLayout>
  )
}

export default MusicsPage
