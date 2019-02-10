import ErrorPage from 'next/error'
import * as React from 'react'
import { Divider } from 'semantic-ui-react'

import ResultTable from '@app/components/molecules/ResultTable'
import ResultSearchForm from '@app/components/organisms/ResultSearchForm'
import { GetUserResultsComponent } from '@app/queries'
import { Router } from '@app/routes'

export type Props = {
  screenName: string
}

const handleSubmit = () => {}

const ResultList: React.SFC<Props> = ({ screenName }) => (
  <>
    <ResultSearchForm handleSubmit={handleSubmit} />
    <Divider />
    <GetUserResultsComponent variables={{ username: screenName }}>
      {({ loading, error, data }) => {
        if (loading) {
          return 'loading'
        }
        if (error || !data || !data.searchMaps) {
          return <ErrorPage statusCode={404} />
        }

        return (
          <ResultTable
            showMapData
            maps={data.searchMaps}
            onClickRow={({ music, playStyle, difficulty }) => {
              if (screenName && music) {
                Router.pushRoute('map', {
                  screenName,
                  musicId: music.id,
                  playStyle: playStyle.toLowerCase(),
                  difficulty: difficulty.toLowerCase(),
                })
              }
            }}
          />
        )
      }}
    </GetUserResultsComponent>
  </>
)

export default ResultList
