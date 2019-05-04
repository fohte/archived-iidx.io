import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import Link from 'next/link'
import * as React from 'react'

import ScoreGraph from '@app/components/atoms/ScoreGraph'
import {
  calcScoreRate,
  defaultGradeDiff,
  searchGrade,
  searchNextGrade,
} from '@app/lib/score'
import { ClearLamp } from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)

export type Result = {
  score: number | null
  missCount: number | null
  clearLamp: ClearLamp | null
  bpi: number | null
}

export type Map = {
  numNotes: number
}

export interface Props {
  showBPI?: boolean
  result?: Result | null
  map: Map
  href?: string
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

const ResultBox: React.FunctionComponent<Props> = ({
  showBPI = false,
  result,
  map,
  href,
}) => {
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
    <div className={cx('data-box-wrapper')}>
      <div
        className={cx('clear-lamp', {
          'full-combo': result && result.clearLamp === ClearLamp.FullCombo,
          'ex-hard-clear': result && result.clearLamp === ClearLamp.ExHard,
          'hard-clear': result && result.clearLamp === ClearLamp.Hard,
          clear: result && result.clearLamp === ClearLamp.Normal,
          'easy-clear': result && result.clearLamp === ClearLamp.Easy,
          'assist-clear': result && result.clearLamp === ClearLamp.Assist,
          failed: result && result.clearLamp === ClearLamp.Failed,
        })}
      />
      <div className={cx('data-box')}>
        <div className={cx('data-box-content')}>
          <div className={cx('grade-box')}>
            <div className={cx('current-grade')}>{current.grade}</div>
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
                {result && result.score != null ? result.score : '-'}
              </span>
              <span className={cx('score-rate')}>
                <IntegerFocusedNumberText num={scoreRate} /> %
              </span>
            </dd>
            <ScoreGraph grade={current.grade} scoreRate={scoreRate} />
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

        {href && (
          <div className={cx('detail-link')}>
            <Link href={href}>
              <a>
                <FontAwesomeIcon icon={faAngleRight} />
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResultBox
