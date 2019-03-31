import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import * as React from 'react'

import ScoreGraph from '@app/components/atoms/ScoreGraph'
import {
  calcScoreRate,
  defaultGradeDiff,
  searchGrade,
  searchNextGrade,
} from '@app/lib/score'
import { ClearLamp, Difficulty, PlayStyle } from '@app/queries'
import { Link } from '@app/routes'
import * as css from './style.scss'

const cx = classnames.bind(css)

export type Result = {
  score: number | null
  missCount: number | null
  clearLamp: ClearLamp | null
  bpi: number | null
}

export type Music = {
  id: string
  title: string
}

export type Map = {
  numNotes: number
  level: number
  difficulty: Difficulty
  playStyle: PlayStyle
  result?: Result | null
  music: Music
}

export type Props = {
  maps: Map[]
  screenName: string
  showBPI?: boolean
  totalPages?: number
  activePage?: number
  onPageChange?: (newActivePage: number) => void
}

const IntegerFocusedNumberText: React.FunctionComponent<{ num: number }> = ({
  num,
}) => {
  const [integerPart, decimalPart] = num
    .toFixed(2)
    .toString()
    .split('.')
  return (
    <>
      <span className={cx('integer-part')}>{integerPart}</span>.
      <span className={cx('decimal-part')}>{decimalPart}</span>
    </>
  )
}

const ResultTable: React.SFC<Props> = ({
  maps,
  showBPI = false,
  screenName,
}) => {
  return (
    <>
      <div className={cx('result-table')}>
        {maps.map((map, i) => {
          const { result, music } = map

          const current =
            result && result.score != null
              ? searchGrade(result.score, map.numNotes)
              : defaultGradeDiff
          const next =
            result && result.score != null
              ? searchNextGrade(result.score, map.numNotes)
              : defaultGradeDiff

          const scoreRate =
            result && result.score != null
              ? calcScoreRate(result.score, map.numNotes)
              : 0

          return (
            <div className={cx('item')} key={i}>
              <div className={cx('box')}>
                <div className={cx('header')}>
                  <div
                    className={cx('label', {
                      'difficulty-another':
                        map.difficulty === Difficulty.Another,
                      'difficulty-hyper': map.difficulty === Difficulty.Hyper,
                      'difficulty-normal': map.difficulty === Difficulty.Normal,
                    })}
                  >
                    ☆{map.level}
                  </div>
                  <div className={cx('title')}>{music.title}</div>
                </div>

                <div className={cx('data-box-wrapper')}>
                  <div
                    className={cx('clear-lamp', {
                      'full-combo':
                        result && result.clearLamp === ClearLamp.FullCombo,
                      'ex-hard-clear':
                        result && result.clearLamp === ClearLamp.ExHard,
                      'hard-clear':
                        result && result.clearLamp === ClearLamp.Hard,
                      clear: result && result.clearLamp === ClearLamp.Normal,
                      'easy-clear':
                        result && result.clearLamp === ClearLamp.Easy,
                      'assist-clear':
                        result && result.clearLamp === ClearLamp.Assist,
                      failed: result && result.clearLamp === ClearLamp.Failed,
                    })}
                  />
                  <div className={cx('data-box')}>
                    <div className={cx('data-box-content')}>
                      <div className={cx('grade-box')}>
                        <div className={cx('current-grade')}>
                          {current.grade}
                        </div>
                        <div className={cx('around-grade')}>
                          {current.diff === 0 && next.diff === 0
                            ? '-'
                            : current.diff <= -next.diff
                            ? `${current.grade} +${current.diff}`
                            : `${next.grade} ${next.diff}`}
                        </div>
                      </div>

                      <dl className={cx('score-box')}>
                        <dt>EX-SCORE</dt>
                        <dd>
                          <span className={cx('score-text')}>
                            {result && result.score != null
                              ? result.score
                              : '-'}
                          </span>
                          <span className={cx('score-rate')}>
                            <IntegerFocusedNumberText num={scoreRate} /> %
                          </span>
                        </dd>
                        <ScoreGraph
                          grade={current.grade}
                          scoreRate={scoreRate}
                        />
                      </dl>

                      {showBPI && (
                        <dl className={cx('bpi-box')}>
                          <dt>BPI</dt>
                          <dd className={cx('bpi')}>
                            {result && result.bpi != null ? (
                              <IntegerFocusedNumberText num={result.bpi} />
                            ) : (
                              '-'
                            )}
                          </dd>
                        </dl>
                      )}
                    </div>

                    <div className={cx('detail-link')}>
                      <Link
                        route="map"
                        params={{
                          screenName,
                          musicId: music.id,
                          playStyle: map.playStyle.toLowerCase(),
                          difficulty: map.difficulty.toLowerCase(),
                        }}
                      >
                        <a>
                          <FontAwesomeIcon icon={faAngleRight} />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ResultTable
