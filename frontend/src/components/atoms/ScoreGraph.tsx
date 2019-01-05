import * as React from 'react'
import styled from 'styled-components'
import { Diff } from 'utility-types'

import { Grade } from '@app/lib/score'
import { colors } from '@app/styles'

export interface Props {
  grade: Grade | null
  scoreRate: number
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 1.5em;
`

interface ScoreBarProps {
  rate: number
  color: string
}

const ScoreBar = styled('div')<ScoreBarProps>`
  width: ${props => props.rate}%;
  height: 50%;
  background-color: ${props => props.color};
  position: absolute;
  vertical-align: middle;
  top: 25%;
  z-index: 0;
`

interface VerticalBarProps {
  length: number
  borderStyle: string
  borderColor: string
}

const VerticalBar = styled('div')<VerticalBarProps>`
  width: ${props => props.length}%;
  height: 100%;
  border-right: 1px ${props => props.borderStyle} ${props => props.borderColor};
  position: absolute;
`

interface TargetBarProps {
  isReached: boolean
  length: number
}

const TargetBar = styled(VerticalBar).attrs<
  TargetBarProps,
  Diff<VerticalBarProps, TargetBarProps>
>(({ isReached }) => ({
  borderColor: isReached ? colors.base.blue : colors.base.grey,
  borderStyle: 'dotted',
}))<TargetBarProps>`
  z-index: 10;
`

interface BorderBarProps {}

const BorderBar = styled(VerticalBar).attrs<
  BorderBarProps,
  Diff<VerticalBarProps, BorderBarProps>
>(() => ({
  borderColor: colors.base.grey,
  borderStyle: 'solid',
  length: 100,
}))`
  z-index: 10;
  border-left: 1px ${props => props.borderStyle} ${props => props.borderColor};
`

const ScoreGraph: React.SFC<Props> = ({ grade, scoreRate }) => (
  <Wrapper>
    <ScoreBar rate={scoreRate} color={colors.grade[grade || 'default']} />
    <BorderBar />
    {[6, 7, 8].map(x => {
      const targetRate = (x / 9) * 100
      return (
        <TargetBar
          key={x}
          length={targetRate}
          isReached={scoreRate >= targetRate}
        />
      )
    })}
  </Wrapper>
)

export default ScoreGraph
