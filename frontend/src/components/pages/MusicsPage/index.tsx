import * as _ from 'lodash'
import * as React from 'react'
import spacetime from 'spacetime'

import { FormValues } from '@app/components/organisms/FilterForm'
import ResultList from '@app/components/organisms/ResultList'
import ResultSearchForm from '@app/components/organisms/ResultSearchForm'
import UserProfileLayout from '@app/components/templates/UserProfileLayout'
import ensureArray from '@app/lib/ensureArray'
import { Difficulty, PlayStyle } from '@app/queries'
import routes from '@server/routes'

const { Router } = routes

export interface Props {
  screenName: string
  title?: string
  playStyle: PlayStyle
  difficulties?: Difficulty[]
  levels?: number[]
  onlyUpdated?: boolean
  updatedOn?: Date
  page?: number
}

const compactFormValues = ({
  title,
  difficulties,
  levels,
  onlyUpdated,
  updatedOn,
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

  if (onlyUpdated) {
    newValues.onlyUpdated = onlyUpdated

    if (updatedOn) {
      newValues.updatedOn = updatedOn
    }
  }

  return newValues
}

const MusicsPage = ({
  screenName,
  title,
  playStyle,
  difficulties,
  levels,
  onlyUpdated,
  updatedOn,
  page,
}: Props) => {
  const [activePage, setPage] = React.useState(page || 1)

  const formValues: FormValues = {
    title: title || null,
    difficulties: difficulties || [],
    levels: levels || [],
    onlyUpdated: !!onlyUpdated,
    updatedOn: updatedOn,
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

    if (query.onlyUpdated) {
      query.onlyUpdated = 'true'
    }

    if (query.updatedOn) {
      query.updatedOn = spacetime(query.updatedOn).format('yyyy-MM-dd')
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
      activeTab="musics"
    >
      <ResultSearchForm
        formValues={formValues}
        onSubmit={values => {
          const compactedFormValues = compactFormValues(values)
          changeRoute({ page: 1, ...compactedFormValues }, { replace: false })
          setPage(1)
        }}
      />
      <ResultList
        screenName={screenName}
        formValues={formValues}
        playStyle={playStyle}
        onPageChange={newActivePage => {
          const currentQuery = _.omit(Router.query || {}, [
            'screenName',
            'playStyle',
          ])
          changeRoute(
            { ...currentQuery, page: newActivePage },
            { replace: true },
          )

          setPage(newActivePage)
        }}
        activePage={activePage}
      />
    </UserProfileLayout>
  )
}

export default MusicsPage
