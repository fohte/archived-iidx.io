import classnames from 'classnames/bind'
import * as _ from 'lodash'
import * as React from 'react'

import { CurrentResult, OldResult } from '@app/components/molecules/ResultBox'
import ResultCard from '@app/components/molecules/ResultCard'
import { Difficulty, PlayStyle } from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Music {
  number: number
  title: string
}

export interface Map {
  id: string
  numNotes: number
  level: number
  difficulty: Difficulty
  playStyle: PlayStyle
  result: CurrentResult | null
  oldResult: OldResult | null
  music: Music
}

type Data =
  | {
      loading: true
      numDummyMaps: number
    }
  | {
      loading: false
      maps: Map[]
    }

export interface Props {
  data: Data
  screenName: string
  showBPI?: boolean
}

const ResultTable: React.SFC<Props> = ({
  data,
  showBPI = false,
  screenName,
}) => {
  return (
    <>
      <div className={cx('result-table')}>
        {data.loading
          ? _.range(data.numDummyMaps).map(n => (
              <ResultCard
                key={n}
                data={{ loading: true }}
                showBPI={showBPI}
                showAdditionalArea
                screenName={screenName}
              />
            ))
          : data.maps.map(map => (
              <ResultCard
                key={map.id}
                data={{ loading: false, map }}
                showBPI={showBPI}
                showAdditionalArea
                screenName={screenName}
              />
            ))}
      </div>
    </>
  )
}

export default ResultTable
