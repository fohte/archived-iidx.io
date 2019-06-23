import * as _ from 'lodash'
import * as React from 'react'

import ResultList from '@app/components/organisms/ResultList'
import { FormValues } from '@app/components/organisms/ResultSearchForm'
import UserProfileLayout, {
  Tab,
} from '@app/components/templates/UserProfileLayout'
import { Difficulty, PlayStyle } from '@app/queries'
import { Router } from '@app/routes'

export interface Props {
  screenName: string
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
    playStyle == null &&
    (difficulties == null || difficulties.length === 0) &&
    (levels == null || levels.length === 0)

  const initialValues: FormValues = isQueryEmpty
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

export default MusicsPage
