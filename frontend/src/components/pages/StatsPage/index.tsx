import * as _ from 'lodash'
import * as React from 'react'

import Box from '@app/components/atoms/Box'
import BoxHeader from '@app/components/atoms/BoxHeader'
import MatrixTable from '@app/components/molecules/MatrixTable'
import UserProfileLayout from '@app/components/templates/UserProfileLayout'
import { PlayStyle, Grade } from '@app/queries'

export interface Props {
  screenName: string
  playStyle: PlayStyle
}

const grades = [..._.keys(Grade).map(g => g.toUpperCase()), 'NO PLAY']

const StatsPage: React.FC<Props> = ({ screenName, playStyle }) => {
  return (
    <UserProfileLayout
      screenName={screenName}
      playStyle={playStyle}
      activeTab="stats"
    >
      <Box>
        <BoxHeader>Grades</BoxHeader>

        <MatrixTable
          data={[[1, 2], [0, 1]]}
          rowHeaders={grades}
          columnHeaders={_.rangeRight(1, 13).map(x => `☆${x}`)}
        />
      </Box>
    </UserProfileLayout>
  )
}

export default StatsPage
