import * as _ from 'lodash'
import * as React from 'react'

import UserProfileLayout from '@app/components/templates/UserProfileLayout'
import { PlayStyle } from '@app/queries'

export interface Props {
  screenName: string
  playStyle: PlayStyle
}

const StatsPage = ({ screenName, playStyle }: Props) => {
  return (
    <UserProfileLayout
      screenName={screenName}
      playStyle={playStyle}
      activeTab="stats"
    >
      Stats
    </UserProfileLayout>
  )
}

export default StatsPage
