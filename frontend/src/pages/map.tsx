import { GraphQLError } from 'graphql'
import ErrorPage from 'next/error'
import Head from 'next/head'
import * as React from 'react'

import MapDetail from '@app/components/organisms/MapDetail'
import UserProfileLayout, {
  Tab,
} from '@app/components/templates/UserProfileLayout'
import initApollo from '@app/lib/initApollo'
import {
  ensureDifficulty,
  ensureInteger,
  ensurePlayStyle,
  ensureString,
} from '@app/lib/queryParamParser'
import throwSSRError from '@app/lib/throwSSRError'
import { PageComponentType } from '@app/pages/_app'
import {
  Difficulty,
  PlayStyle,
  FindMapDocument,
  FindMapQuery,
  FindMapQueryVariables,
} from '@app/queries'

// interface だと Record 型を満たさないので注意
// eslint-disable-next-line @typescript-eslint/prefer-interface
export type Query = {
  screenName: string
  musicNumber: string
  playStyle: string
  difficulty: string
}

export interface Props {
  music?: FindMapQuery['music'] | null
  errors?: ReadonlyArray<GraphQLError>
  loading: boolean
  screenName?: string
  playStyle?: PlayStyle
}

const MapPage: PageComponentType<Props, Props, Query> = ({
  loading,
  errors,
  music,
  playStyle,
  screenName,
}: Props) => {
  if (loading) {
    return <>loading</>
  }
  if (errors || !music || !music.map || !screenName || !playStyle) {
    return <ErrorPage statusCode={404} />
  }

  const { map } = music
  const { difficulty } = map

  const difficultyText = `${playStyle}${difficulty[0]}`

  return (
    <>
      <Head>
        <title>
          @{screenName} - {music.title} [{difficultyText}] | iidx.io
        </title>
      </Head>
      <UserProfileLayout
        screenName={screenName}
        playStyle={playStyle}
        activeTab={Tab.Musics}
        breadcrumbItems={[
          {
            text: 'Musics',
            route: `/@${screenName}/${playStyle.toLowerCase()}/musics`,
          },
          {
            text: `${music.title} [${difficultyText}]`,
            route: `/@${screenName}/musics/${
              music.id
            }/${playStyle.toLowerCase()}/${difficulty.toLowerCase()}`,
            active: true,
          },
        ]}
      >
        <MapDetail
          music={music}
          map={map}
          result={map.result || undefined}
          allResults={map.results}
          screenName={screenName}
        />
      </UserProfileLayout>
    </>
  )
}

const makeDefaultProps = (): Props => ({ loading: false })

MapPage.getInitialProps = async ({ res, query }) => {
  let playStyle: PlayStyle
  let difficulty: Difficulty
  let screenName: string
  let musicNumber: number

  try {
    playStyle = ensurePlayStyle(query.playStyle, 'playStyle')
    difficulty = ensureDifficulty(query.difficulty, 'difficulty')
    screenName = ensureString(query.screenName, 'screenName')
    musicNumber = ensureInteger(query.musicNumber, 'musicNumber')
  } catch (e) {
    throwSSRError(res, 404)
    console.error(e)
    return makeDefaultProps()
  }

  const client = initApollo()

  const result = await client.query<FindMapQuery, FindMapQueryVariables>({
    query: FindMapDocument,
    variables: {
      musicNumber,
      playStyle,
      difficulty,
      username: screenName,
    },
    errorPolicy: 'all',
  })

  if (!result.data.music || !result.data.music.map) {
    throwSSRError(res, 404)
  }

  return {
    music: result.data.music,
    screenName,
    playStyle,
    errors: result.errors,
    loading: result.loading,
  }
}

export default MapPage
