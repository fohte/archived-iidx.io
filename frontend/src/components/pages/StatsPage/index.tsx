import * as _ from 'lodash'
import * as React from 'react'

import { Query } from '@pages/musics'
import Box from '@app/components/atoms/Box'
import BoxHeader from '@app/components/atoms/BoxHeader'
import MatrixTable, { MatrixData } from '@app/components/molecules/MatrixTable'
import UserProfileLayout from '@app/components/templates/UserProfileLayout'
import { PlayStyle, Grade, useFetchStatsQuery } from '@app/queries'
import useServerResponse from '@app/lib/useServerResponse'
import routes from '@server/routes'

export interface Props {
  screenName: string
  playStyle: PlayStyle
}

const getMapKey = (level: number, grade: Grade) => `${level}-${grade}`

const grades = _.values(Grade)
const gradeTexts = grades.map(g => g.replace('_', ' '))

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
    map.set(getMapKey(level, grade), count)
  })

  const matrixData: MatrixData[][] = levels.reduce(
    (rows, level) => [
      ...rows,
      grades.reduce(
        (columns, grade: Grade) => {
          const value = map.get(getMapKey(level, grade)) || 0

          const musicsQuery: Query = {
            screenName: screenName,
            playStyle: playStyle.toLowerCase(),
            levels: [level.toString()],
            grades: [grade.toLowerCase()],
          }

          const newColumn: MatrixData = { value }

          if (value !== 0) {
            newColumn.link = routes.findAndGetUrls(
              'musics',
              musicsQuery,
            ).urls.as
          }

          return [...columns, newColumn]
        },
        [] as MatrixData[],
      ),
    ],
    [] as MatrixData[][],
  )

  const footerData: MatrixData[] = _.unzip(matrixData).map((row, x) => {
    const value = _.sum(row.map(d => d.value))

    const data: MatrixData = { value }

    const musicsQuery: Query = {
      screenName: screenName,
      playStyle: playStyle.toLowerCase(),
      grades: [grades[x].toLowerCase()],
    }

    if (value !== 0) {
      data.link = routes.findAndGetUrls('musics', musicsQuery).urls.as
    }

    return data
  })

  return (
    <UserProfileLayout
      screenName={screenName}
      playStyle={playStyle}
      activeTab="stats"
    >
      <Box>
        <BoxHeader>Grades</BoxHeader>

        <MatrixTable
          data={[...matrixData, footerData]}
          rowHeaders={gradeTexts}
          columnHeaders={[...levels.map(x => `☆${x}`), 'Total']}
        />
      </Box>
    </UserProfileLayout>
  )
}

export default StatsPage
