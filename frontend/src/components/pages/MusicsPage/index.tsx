import * as _ from 'lodash'
import * as React from 'react'

import ResultList from '@app/components/organisms/ResultList'
import ResultSearchForm from '@app/components/organisms/ResultSearchForm'
import UserProfileLayout from '@app/components/templates/UserProfileLayout'
import { PlayStyle } from '@app/queries'
import {
  FilterFormValueType,
  toQueryParams,
  compactValues,
} from '@app/models/FilterFormValue'
import FilterFormContext from '@app/contexts/FilterFormContext'
import filterFormReducer, {
  FilterFormDispatch,
} from '@app/reducers/filterFormReducer'
import routes from '@server/routes'

const { Router } = routes

export interface Props extends FilterFormValueType {
  screenName: string
  playStyle: PlayStyle
  page?: number
}

const MusicsPage: React.FC<Props> = props => {
  const { screenName, playStyle, page, ...filterFormValues } = props

  const [activePage, setPage] = React.useState(page || 1)

  const changeRoute = (query: any, { replace }: { replace: boolean }) => {
    const filterFormQueries = toQueryParams(query)

    const newQuery: any = {}

    if (query.playStyle) {
      newQuery.playStyle = (query.playStyle as PlayStyle).toLowerCase()
    }

    if (query.page !== 1) {
      newQuery.page = query.page
    }

    const routerMethod = replace ? Router.replace : Router.push

    // currently next-routes doesn't support array for query parameters,
    // so we use `Router.replace` instead of `Router.replaceRoute`.
    routerMethod(
      {
        pathname: '/musics',
        query: {
          ...filterFormQueries,
          ...newQuery,
          screenName,
          playStyle,
        },
      },
      {
        pathname: location.pathname,
        query: {
          ...filterFormQueries,
          ...newQuery,
        },
      },
      { shallow: replace },
    )
  }

  const dispatch: FilterFormDispatch = action => {
    const newState = filterFormReducer(filterFormValues, action)

    const compactedFormValues = compactValues(newState)
    changeRoute({ page: 1, ...compactedFormValues }, { replace: false })
    setPage(1)
  }

  return (
    <FilterFormContext.Provider value={{ values: filterFormValues, dispatch }}>
      <UserProfileLayout
        screenName={screenName}
        playStyle={playStyle}
        activeTab="musics"
      >
        <ResultSearchForm />
        <ResultList
          screenName={screenName}
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
    </FilterFormContext.Provider>
  )
}

export default MusicsPage
