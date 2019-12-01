import * as _ from 'lodash'
import * as React from 'react'

import ResultList from '@app/components/organisms/ResultList'
import ResultSearcher from '@app/components/organisms/ResultSearcher'
import UserProfileLayout from '@app/components/templates/UserProfileLayout'
import { PlayStyle } from '@app/queries'
import {
  ResultSearcherValueType,
  toQueryParams,
  compactValues,
} from '@app/models/ResultSearcherValue'
import ResultSearcherContext from '@app/contexts/ResultSearcherContext'
import resultSearcherReducer, {
  ResultSearcherDispatch,
} from '@app/reducers/resultSearcherReducer'
import routes from '@server/routes'

const { Router } = routes

export interface Props extends ResultSearcherValueType {
  screenName: string
  playStyle: PlayStyle
  page?: number
}

const MusicsPage: React.FC<Props> = props => {
  const { screenName, playStyle, page, ...resultSearcherValues } = props

  const [activePage, setPage] = React.useState(page || 1)

  const changeRoute = (query: any, { replace }: { replace: boolean }) => {
    const resultSearcherQueries = toQueryParams(query)

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
          ...resultSearcherQueries,
          ...newQuery,
          screenName,
          playStyle,
        },
      },
      {
        pathname: location.pathname,
        query: {
          ...resultSearcherQueries,
          ...newQuery,
        },
      },
      { shallow: replace },
    )
  }

  const dispatch: ResultSearcherDispatch = action => {
    const newState = resultSearcherReducer(resultSearcherValues, action)

    const compactedFormValues = compactValues(newState)
    changeRoute({ page: 1, ...compactedFormValues }, { replace: false })
    setPage(1)
  }

  return (
    <ResultSearcherContext.Provider
      value={{ values: resultSearcherValues, dispatch }}
    >
      <UserProfileLayout
        screenName={screenName}
        playStyle={playStyle}
        activeTab="musics"
      >
        <ResultSearcher />
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
    </ResultSearcherContext.Provider>
  )
}

export default MusicsPage
