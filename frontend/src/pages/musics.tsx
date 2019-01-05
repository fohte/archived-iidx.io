import * as _ from 'lodash'
import ErrorPage from 'next/error'
import * as React from 'react'

import ResultTable from '@app/components/molecules/ResultTable'
import MainLayout from '@app/components/templates/MainLayout'
import initApollo from '@app/lib/initApollo'
import throwSSRError from '@app/lib/throwSSRError'
import { PageComponentType } from '@app/pages/_app'
import {
  GetUserResultsDocument,
  GetUserResultsMaps,
  GetUserResultsQuery,
  GetUserResultsVariables,
} from '@app/queries'
import { Router } from '@app/routes'

export type Query = {
  screenName: string
  playStyle?: string
  difficulty?: string
}

export type Props = {
  maps?: GetUserResultsMaps[] | null
  errors?: any[]
  loading: boolean
  screenName?: string
}

const renderMap = ({ loading, errors, maps, screenName }: Props) => {
  if (loading) {
    return 'loading'
  }
  if (errors || !maps) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <ResultTable
      showMapData
      maps={maps.map(m => ({
        numNotes: m.numNotes,
        level: m.level,
        playStyle: m.playStyle,
        difficulty: m.difficulty,
        result: m.bestResult,
        music: m.music,
      }))}
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
}

const MusicsPage: PageComponentType<Props, Props, Query> = props => (
  <MainLayout>{renderMap(props)}</MainLayout>
)

const makeDefaultProps = (): Props => ({ loading: false })

MusicsPage.getInitialProps = async ({ res, query }) => {
  const client = initApollo()

  if (query.screenName == null) {
    throwSSRError(res, 404)
    return makeDefaultProps()
  }

  const result = await client.query<
    GetUserResultsQuery,
    GetUserResultsVariables
  >({
    query: GetUserResultsDocument,
    variables: { username: query.screenName },
    errorPolicy: 'all',
  })

  if (!result.data.maps) {
    throwSSRError(res, 404)
  }

  return {
    maps: result.data.maps,
    errors: result.errors,
    loading: result.loading,
    screenName: query.screenName,
  }
}

export default MusicsPage
