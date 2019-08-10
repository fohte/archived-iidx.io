import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames/bind'
import Link from 'next/link'
import * as React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import ScoreGraph from '@app/components/atoms/ScoreGraph'
import { formats } from '@app/lib/dateTime'
import {
  calcScoreRate,
  defaultGradeDiff,
  searchGrade,
  searchNextGrade,
} from '@app/lib/score'
import { ClearLamp } from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)

dayjs.extend(relativeTime)

export interface Result {
  score?: number | null
  missCount?: number | null
  clearLamp?: ClearLamp | null
  bpi?: number | null
  lastPlayedAt: string
}

export interface Map {
  numNotes: number
}

type Data =
  | {
      loading: true
    }
  | {
      loading: false
      result?: Result | null
      map: Map
    }

export interface Props {
  showBPI?: boolean
  href?: string
  data: Data
  absoluteLastPlayedAt?: boolean
}

const clearTypeTexts: { [key in ClearLamp]: string } = {
  [ClearLamp.FullCombo]: 'FULL COMBO',
  [ClearLamp.ExHard]: 'EX-HARD',
  [ClearLamp.Hard]: 'HARD',
  [ClearLamp.Normal]: 'CLEAR',
  [ClearLamp.Easy]: 'EASY',
  [ClearLamp.Assist]: 'ASSIST',
  [ClearLamp.Failed]: 'FAILED',
}

const ResultBox: React.FunctionComponent<Props> = ({
  showBPI = false,
  data,
  href,
  absoluteLastPlayedAt = false,
}) => {
  if (data.loading) {
    return (
      <div className={cx('data-box-wrapper')}>
        <div className={cx('clear-lamp', 'loading')} />
        <div className={cx('data-box')}>
          <div className={cx('data-box-content')}>
            <div className={cx('score-box-wrapper')}>
              <dl className={cx('score-box')}>
                <div className={cx('data-list', 'ex-score')}>
                  <dt>EX-SCORE</dt>
                  <dd>
                    <span className={cx('score-text', 'loading')} />
                    <span className={cx('score-rate', 'loading')} />
                  </dd>
                </div>
                <ScoreGraph loading />
              </dl>

              <div className={cx('additional-area')}>
                {showBPI && (
                  <dl className={cx('data-list')}>
                    <dt>BPI</dt>
                    <dd>-</dd>
                  </dl>
                )}

                <dl className={cx('data-list', 'clear-type')}>
                  <dt>CLEAR TYPE</dt>
                  <dd>-</dd>
                </dl>

                <dl className={cx('data-list')}>
                  <dt>LAST PLAY</dt>
                  <dd>-</dd>
                </dl>
              </div>
            </div>

            <div className={cx('symbol-area')}>
              <div className={cx('grade-box', 'loading')} />
            </div>
          </div>

          {href && (
            <Link href={href}>
              <a>
                <FontAwesomeIcon icon={faAngleRight} />
              </a>
            </Link>
          )}
        </div>
      </div>
    )
  } else {
    const { result, map } = data

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
            <div className={cx('score-box-wrapper')}>
              <dl className={cx('score-box')}>
                <div className={cx('data-list', 'ex-score')}>
                  <dt>EX-SCORE</dt>
                  <dd>
                    <span className={cx('score-text')}>
                      {result && result.score != null ? result.score : '-'}
                    </span>
                    <span className={cx('score-rate')}>
                      ({scoreRate.toFixed(2)} %)
                    </span>
                  </dd>
                </div>
                <ScoreGraph
                  grade={current.grade}
                  scoreRate={scoreRate}
                  fullCombo={
                    !!(result && result.clearLamp === ClearLamp.FullCombo)
                  }
                />
              </dl>

              <div className={cx('additional-area')}>
                {showBPI && (
                  <dl className={cx('data-list')}>
                    <dt>BPI</dt>
                    <dd className={cx('bpi')}>
                      {result && result.bpi != null
                        ? result.bpi.toFixed(2)
                        : '-'}
                    </dd>
                  </dl>
                )}

                <dl className={cx('data-list', 'clear-type')}>
                  <dt>CLEAR TYPE</dt>
                  <dd
                    className={cx({
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
                  >
                    {result && result.clearLamp
                      ? clearTypeTexts[result.clearLamp]
                      : '-'}
                  </dd>
                </dl>

                <dl className={cx('data-list')}>
                  <dt>LAST PLAY</dt>
                  <dd className={cx('moderate')}>
                    {result
                      ? absoluteLastPlayedAt
                        ? dayjs(result.lastPlayedAt).format(formats.dateTime)
                        : dayjs(result.lastPlayedAt).fromNow()
                      : '-'}
                  </dd>
                </dl>
              </div>
            </div>

            <div className={cx('symbol-area')}>
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
            </div>
          </div>

          {href && (
            <Link href={href}>
              <a>
                <FontAwesomeIcon icon={faAngleRight} />
              </a>
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default ResultBox
