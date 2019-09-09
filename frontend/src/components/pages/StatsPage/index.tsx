import * as _ from 'lodash'
import * as React from 'react'

import Box from '@app/components/atoms/Box'
import BoxHeader from '@app/components/atoms/BoxHeader'
import MatrixTable from '@app/components/molecules/MatrixTable'
import UserProfileLayout from '@app/components/templates/UserProfileLayout'
import { PlayStyle, Grade, useFetchStatsQuery } from '@app/queries'
import useServerResponse from '@app/lib/useServerResponse'

export interface Props {
  screenName: string
  playStyle: PlayStyle
}

const getMapKey = (level: number, grade: Grade | null) => `${level}-${grade}`

const grades = [..._.keys(Grade).map(g => g.toUpperCase()), 'NO PLAY']
const levels = _.rangeRight(1, 13)

const StatsPage: React.FC<Props> = ({ screenName, playStyle }) => {
  const { loading, error, data } = useFetchStatsQuery({
    variables: { username: screenName, playStyle },
  })

  const { setStatus } = useServerResponse()

  if (loading) {
    return (
      <UserProfileLayout
        screenName={screenName}
        playStyle={playStyle}
        activeTab="stats"
      />
    )
  }

  if (error || data == null || data.user == null) {
    setStatus(404)
    return null
  }

  const map = new Map<string, number>()
  data.user.countByEachLevelAndGrade.forEach(({ grade, level, count }) => {
    map.set(getMapKey(level, grade || null), count)
  })

  const matrixData = levels.reduce(
    (rows, level) => [
      ...rows,
      [..._.values(Grade), null].reduce(
        (columns, grade: Grade | null) => [
          ...columns,
          map.get(getMapKey(level, grade)) || 0,
        ],
        [],
      ),
    ],
    [],
  )

  return (
    <UserProfileLayout
      screenName={screenName}
      playStyle={playStyle}
      activeTab="stats"
    >
      <Box>
        <BoxHeader>Grades</BoxHeader>

        <MatrixTable
          data={matrixData}
          rowHeaders={grades}
          columnHeaders={levels.map(x => `☆${x}`)}
        />
      </Box>
    </UserProfileLayout>
  )
}

export default StatsPage
