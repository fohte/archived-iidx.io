import ErrorPage from 'next/error'
import * as React from 'react'

import Map from '@app/components/organisms/Map'
import MainLayout from '@app/components/templates/MainLayout'
import initApollo from '@app/lib/initApollo'
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

const parsePlayStyleString = (playStyle: string): PlayStyle =>
  PlayStyle[pascalize(playStyle)]

const parseDifficultyString = (difficulty: string): Difficulty =>
  Difficulty[pascalize(difficulty)]

const renderMap = ({ loading, errors, music }: Props) => {
  if (loading) {
    return 'loading'
  }
  if (errors || !music || !music.map) {
    return <ErrorPage statusCode={404} />
  }

  return <Map music={music} />
}

const MapPage: PageComponentType<Props, Props, Query> = props => (
  <MainLayout>{renderMap(props)}</MainLayout>
)

MapPage.getInitialProps = async ({
  res,
  query: { musicId, playStyle, difficulty },
}) => {
  const client = initApollo()

  const result = await client.query<FindMapQuery, FindMapVariables>({
    query: FindMapDocument,
    variables: {
      id: musicId,
      playStyle: parsePlayStyleString(playStyle),
      difficulty: parseDifficultyString(difficulty),
    },
    errorPolicy: 'all',
  })

  if (!result.data.music || !result.data.music.map) {
    if (res) {
      res.statusCode = 404
    }
  }

  return {
    music: result.data.music,
    errors: result.errors,
    loading: result.loading,
  }
}

export default MapPage
