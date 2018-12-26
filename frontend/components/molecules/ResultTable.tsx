import * as React from 'react'
import { Table } from 'semantic-ui-react'
import styled from 'styled-components'

import ClearLampLabel from '@app/components/atoms/ClearLampLabel'
import ScoreGraph from '@app/components/atoms/ScoreGraph'
import GradeLabelGroup from '@app/components/molecules/GradeLabelGroup'
import {
  calcScoreRate,
  defaultGradeDiff,
  searchGrade,
  searchNextGrade,
} from '@app/lib/score'
import { ClearLamp, FindMapMap, Grade } from '@app/queries'
import { clearLamp } from '@app/styles'

export type Result = {
  score: number
  missCount: number
  clearLamp: ClearLamp
  grade: Grade
}

export type Props = {
  map: FindMapMap
  result?: Result
}

interface ClearLampCellProps {
  clearLamp: ClearLamp | null
}

const ClearLampCell = styled.td<ClearLampCellProps>`
  ${(props: ClearLampCellProps) =>
    clearLamp.backgroundCSS[props.clearLamp || 'default']}
  width: 1%;
  padding: 3px !important;
`

const ResultTable: React.SFC<Props> = ({ map, result }) => {
  const current = result
    ? searchGrade(result.score, map.numNotes)
    : defaultGradeDiff
  const next = result
    ? searchNextGrade(result.score, map.numNotes)
    : defaultGradeDiff

  const scoreRate = result ? calcScoreRate(result.score, map.numNotes) : 0

  return (
    <Table unstackable celled selectable style={{ overflow: 'hidden' }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell style={{ padding: '0px' }} />
          <Table.HeaderCell width={3} textAlign="center">
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
        <Table.Row>
          <Table.Cell
            as={ClearLampCell}
            clearLamp={result ? result.clearLamp : null}
          />
          <Table.Cell textAlign="center">
            <ClearLampLabel clearLamp={result ? result.clearLamp : null} />
          </Table.Cell>
          <Table.Cell textAlign="center">
            <GradeLabelGroup current={current} next={next} />
          </Table.Cell>
          <Table.Cell textAlign="center">
            {result ? result.score : '-'}
          </Table.Cell>
          <Table.Cell>
            <div>{scoreRate.toFixed(2)} %</div>
            <ScoreGraph grade={current.grade} scoreRate={scoreRate} />
          </Table.Cell>
          <Table.Cell textAlign="center">
            {result ? result.missCount : '-'}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default ResultTable
