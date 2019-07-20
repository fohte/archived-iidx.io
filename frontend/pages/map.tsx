import { GraphQLError } from 'graphql'
import ErrorPage from 'next/error'
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
import { Difficulty, PlayStyle } from '@app/queries'
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
  errors?: ReadonlyArray<GraphQLError>
  loading: boolean
  screenName?: string
  playStyle?: PlayStyle
}

const MapPage: PageComponentType<Props> = ({
  loading,
  errors,
  music,
  playStyle,
  screenName,
}: Props) => {
  if (loading) {
    return <>'loading'</>
  }
  if (errors || !music || !music.map || !screenName || !playStyle) {
    return <ErrorPage statusCode={404} />
  }

  const { map } = music
  const { difficulty } = map

  return (
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
          text: `${music.title} [${playStyle}${difficulty[0]}]`,
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
        screenName={screenName}
      />
    </UserProfileLayout>
  )
}

const makeDefaultProps = (): Props => ({ loading: false })

MapPage.getInitialProps = async ({ res, query }) => {
  let playStyle: PlayStyle
  let difficulty: Difficulty
  let screenName: string
  let musicId: string

  try {
    playStyle = ensurePlayStyle(query.playStyle, 'playStyle')
    difficulty = ensureDifficulty(query.difficulty, 'difficulty')
    screenName = ensureString(query.screenName, 'screenName')
    musicId = ensureInteger(query.musicId, 'musicId').toString()
  } catch (e) {
    throwSSRError(res, 404)
    return makeDefaultProps()
  }

  const client = initApollo()

  const result = await client.query<FindMapQuery, FindMapVariables>({
    query: FindMapDocument,
    variables: {
      id: musicId,
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
