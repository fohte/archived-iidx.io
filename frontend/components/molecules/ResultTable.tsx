import * as React from 'react'
import { Table } from 'semantic-ui-react'
import styled from 'styled-components'

import ClearLampLabel from '@app/components/atoms/ClearLampLabel'
import ScoreGraph from '@app/components/atoms/ScoreGraph'
import GradeLabelGroup from '@app/components/molecules/GradeLabelGroup'
import { makeTitle } from '@app/lib/music'
import {
  calcScoreRate,
  defaultGradeDiff,
  searchGrade,
  searchNextGrade,
} from '@app/lib/score'
import { ClearLamp, Difficulty, PlayStyle } from '@app/queries'
import { clearLamp } from '@app/styles'

export type Result = {
  score: number
  missCount: number
  clearLamp: ClearLamp
}

export type Music = {
  id: string
  title: string
  subTitle: string
}

export type Map = {
  numNotes: number
  level: number
  difficulty: Difficulty
  playStyle: PlayStyle
  result?: Result | null
  music?: Music | null
}

export type Props = {
  maps: Map[]
  showMapData?: boolean
  onClickRow?: (map: Map) => void
}

interface ClearLampCellProps {
  clearLamp: ClearLamp | null
}

const ClearLampCell = styled.td<ClearLampCellProps>`
  ${(props: ClearLampCellProps) =>
    clearLamp.backgroundCSS[props.clearLamp || 'default']} width: 1%;
  padding: 3px !important;
`

const Row: React.SFC<{
  map: Map
  showMapData: boolean
  onClickRow?: Props['onClickRow']
}> = ({ map, showMapData, onClickRow }) => {
  const { result, music } = map

  const current = result
    ? searchGrade(result.score, map.numNotes)
    : defaultGradeDiff
  const next = result
    ? searchNextGrade(result.score, map.numNotes)
    : defaultGradeDiff

  const scoreRate = result ? calcScoreRate(result.score, map.numNotes) : 0

  return (
    <Table.Row
      style={onClickRow ? { cursor: 'pointer' } : {}}
      onClick={() => {
        if (onClickRow) {
          onClickRow(map)
        }
      }}
    >
      <Table.Cell
        as={ClearLampCell}
        clearLamp={result ? result.clearLamp : null}
      />
      {showMapData && music && (
        <>
          <Table.Cell textAlign="center">{map.level}</Table.Cell>
          <Table.Cell textAlign="center">{makeTitle(music)}</Table.Cell>
        </>
      )}
      <Table.Cell textAlign="center">
        <ClearLampLabel clearLamp={result ? result.clearLamp : null} />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <GradeLabelGroup current={current} next={next} />
      </Table.Cell>
      <Table.Cell textAlign="center">{result ? result.score : '-'}</Table.Cell>
      <Table.Cell>
        <div>{scoreRate.toFixed(2)} %</div>
        <ScoreGraph grade={current.grade} scoreRate={scoreRate} />
      </Table.Cell>
      <Table.Cell textAlign="center">
        {result ? result.missCount : '-'}
      </Table.Cell>
    </Table.Row>
  )
}

const ResultTable: React.SFC<Props> = ({ maps, showMapData, onClickRow }) => {
  return (
    <Table
      unstackable
      celled
      selectable={!!onClickRow}
      style={{ overflow: 'hidden' }}
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell style={{ padding: '0px' }} />
          {showMapData && (
            <>
              <Table.HeaderCell width={1} textAlign="center">
                Level
              </Table.HeaderCell>
              <Table.HeaderCell width={4} textAlign="center">
                Title
              </Table.HeaderCell>
            </>
          )}
          <Table.HeaderCell width={2} textAlign="center">
            Clear
          </Table.HeaderCell>
          <Table.HeaderCell width={3} textAlign="center">
            DJ Level
          </Table.HeaderCell>
          <Table.HeaderCell width={1} textAlign="center">
            Score
          </Table.HeaderCell>
          <Table.HeaderCell width={6}>Rate</Table.HeaderCell>
          <Table.HeaderCell width={1} textAlign="center">
            BP
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {maps.map((map, i) => (
          <Row
            key={i}
            onClickRow={onClickRow}
            showMapData={!!showMapData}
            map={map}
          />
        ))}
      </Table.Body>
    </Table>
  )
}

export default ResultTable
