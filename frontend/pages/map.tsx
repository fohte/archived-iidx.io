import ErrorPage from 'next/error'
import * as React from 'react'

import Map from '@app/components/organisms/Map'
import MainLayout from '@app/components/templates/MainLayout'
import initApollo from '@app/lib/initApollo'
import throwSSRError from '@app/lib/throwSSRError'
import { PageComponentType } from '@app/pages/_app'
import {
  Difficulty,
  FindMapDocument,
  FindMapMusic,
  FindMapQuery,
  FindMapVariables,
  PlayStyle,
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

const pascalize = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`

const parsePlayStyleString = (playStyle: string): PlayStyle | undefined =>
  PlayStyle[pascalize(playStyle)]

const parseDifficultyString = (difficulty: string): Difficulty | undefined =>
  Difficulty[pascalize(difficulty)]

const renderMap = ({ loading, errors, music }: Props) => {
  if (loading) {
    return 'loading'
  }
  if (errors || !music || !music.map) {
    return <ErrorPage statusCode={404} />
  }

  return <Map music={music} map={music.map} />
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
    variables: { id: query.musicId, playStyle, difficulty },
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
