import ErrorPage from 'next/error'
import * as React from 'react'

import Map from '@app/components/organisms/Map'
import MainLayout from '@app/components/templates/MainLayout'
import initApollo from '@app/lib/initApollo'
import throwSSRError from '@app/lib/throwSSRError'
import {
  parseDifficultyString,
  parsePlayStyleString,
} from '@app/lib/queryParamParser'
import { PageComponentType } from '@app/pages/_app'
import {
  FindMapDocument,
  FindMapMusic,
  FindMapQuery,
  FindMapVariables,
} from '@app/queries'

export type Query = {
  screenName: string
  musicId: string
  playStyle: string
  difficulty: string
}

export type Props = {
  music?: FindMapMusic | null
  errors?: any[]
  loading: boolean
}

const renderMap = ({ loading, errors, music }: Props) => {
  if (loading) {
    return 'loading'
  }
  if (errors || !music || !music.map) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Map
      music={music}
      map={music.map}
      result={music.map.bestResult || undefined}
    />
  )
}

const MapPage: PageComponentType<Props, Props, Query> = props => (
  <MainLayout>{renderMap(props)}</MainLayout>
)

const makeDefaultProps = (): Props => ({ loading: false })

MapPage.getInitialProps = async ({ res, query }) => {
  const client = initApollo()

  const playStyle = parsePlayStyleString(query.playStyle)
  const difficulty = parseDifficultyString(query.difficulty)

  if (playStyle == null || difficulty == null) {
    throwSSRError(res, 404)
    return makeDefaultProps()
  }

  const result = await client.query<FindMapQuery, FindMapVariables>({
    query: FindMapDocument,
    variables: {
      id: query.musicId,
      playStyle,
      difficulty,
      username: query.screenName,
    },
    errorPolicy: 'all',
  })

  if (!result.data.music || !result.data.music.map) {
    throwSSRError(res, 404)
  }

  return {
    music: result.data.music,
    errors: result.errors,
    loading: result.loading,
  }
}

export default MapPage
