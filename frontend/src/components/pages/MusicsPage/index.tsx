import * as _ from 'lodash'
import * as React from 'react'

import { FormValues } from '@app/components/organisms/FilterForm'
import ResultList from '@app/components/organisms/ResultList'
import ResultSearchForm from '@app/components/organisms/ResultSearchForm'
import UserProfileLayout, {
  Tab,
} from '@app/components/templates/UserProfileLayout'
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
    (difficulties == null || difficulties.length === 0) &&
    (levels == null || levels.length === 0)

  const formValues: FormValues = isQueryEmpty
    ? {
        title: null,
        playStyle,
        difficulties: [],
        levels: [12],
      }
    : {
        title: title || null,
        playStyle,
        difficulties: difficulties || [],
        levels: levels || [],
      }

  const changeRoute = (newQuery: any, { replace }: { replace: boolean }) => {
    const currentQuery = _.omit(Router.query || {}, 'screenName')
    const query = { ...currentQuery, ...newQuery }

    const routerMethod = replace ? Router.replace : Router.push

    // currently next-routes doesn't support array for query parameters,
    // so we use `Router.replace` instead of `Router.replaceRoute`.
    routerMethod(
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
        onSubmit={values => {
          const compactedFormValues = compactFormValues(values)
          changeRoute({ ...compactedFormValues }, { replace: false })
        }}
        playStyle={playStyle}
      />
      <ResultList
        screenName={screenName}
        title={formValues.title}
        playStyle={formValues.playStyle}
        difficulties={formValues.difficulties}
        levels={formValues.levels}
        onPageChange={newActivePage => {
          changeRoute({ page: newActivePage }, { replace: true })
        }}
        defaultActivePage={page}
      />
    </UserProfileLayout>
  )
}

export default MusicsPage
