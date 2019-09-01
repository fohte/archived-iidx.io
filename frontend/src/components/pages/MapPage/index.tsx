import * as React from 'react'
import Head from 'next/head'
import { Spacetime } from 'spacetime'

import MapDetail from '@app/components/organisms/MapDetail'
import UserProfileLayout, {
  Tab,
} from '@app/components/templates/UserProfileLayout'
import {
  useFindMapQuery,
  FindMapQueryVariables,
  Difficulty,
  PlayStyle,
} from '@app/queries'
import useServerResponse from '@app/lib/useServerResponse'
import { findPreviousRefreshDateTime } from '@app/lib/dateTime'
import { useCurrentDateTimeContext } from '@app/lib/hooks'

export interface Props {
  musicNumber: number
  playStyle: PlayStyle
  difficulty: Difficulty
  screenName: string
}

export const toQueryVariables = (
  { musicNumber, playStyle, difficulty, screenName }: Props,
  current: Spacetime,
): FindMapQueryVariables => ({
  musicNumber,
  playStyle,
  difficulty,
  username: screenName,
  comparisonDateTime: findPreviousRefreshDateTime(current).format('iso-utc'),
})

const MapPage: React.FC<Props> = props => {
  const { playStyle, difficulty, screenName } = props

  const current = useCurrentDateTimeContext()

  const { loading, error, data } = useFindMapQuery({
    variables: toQueryVariables(props, current),
  })

  const { setStatus } = useServerResponse()

  if (loading) {
    return <>loading</>
  }

  if (error || data == null || data.music == null || data.music.map == null) {
    setStatus(404)
    return null
  }

  const { music } = data
  const { map } = data.music

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
          result={map.result}
          oldResult={map.oldResult}
          allResults={map.results}
          screenName={screenName}
        />
      </UserProfileLayout>
    </>
  )
}

export default MapPage
