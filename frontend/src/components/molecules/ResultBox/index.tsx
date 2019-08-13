import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames/bind'
import Link from 'next/link'
import * as React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { WithLoadingState } from '@app/lib/types'
import ScoreGraph from '@app/components/atoms/ScoreGraph'
import Grade from '@app/components/atoms/Grade'
import ClearLamp from '@app/components/atoms/ClearLamp'
import { formats } from '@app/lib/dateTime'
import {
  GradeDiff,
  Grade as GradeEnum,
  ClearLamp as ClearLampEnum,
} from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)

dayjs.extend(relativeTime)

export interface Result {
  score?: number | null
  scoreRate?: number | null
  missCount?: number | null
  clearLamp?: ClearLampEnum | null
  bpi?: number | null
  lastPlayedAt: string
  gradeDiff: Pick<GradeDiff, 'grade'>
  nearestGradeDiff: GradeDiff
}

export interface Map {
  numNotes: number
}

interface Data {
  result?: Result | null
  map: Map
}

export interface Props {
  showBPI?: boolean
  showAdditionalArea?: boolean
  href?: string
  data: WithLoadingState<Data>
  absoluteLastPlayedAt?: boolean
}

const isZeroGradeDiff = ({ grade, diff }: GradeDiff) =>
  grade === GradeEnum.F && diff === 0

const digScoreRate = (result: Data['result']): number =>
  (result && result.scoreRate) || 0

const clearTypeTexts: { [key in ClearLampEnum]: string } = {
  [ClearLampEnum.FullCombo]: 'FULL COMBO',
  [ClearLampEnum.ExHard]: 'EX-HARD',
  [ClearLampEnum.Hard]: 'HARD',
  [ClearLampEnum.Normal]: 'CLEAR',
  [ClearLampEnum.Easy]: 'EASY',
  [ClearLampEnum.Assist]: 'ASSIST',
  [ClearLampEnum.Failed]: 'FAILED',
}

const ResultBox: React.FunctionComponent<Props> = ({
  showBPI = false,
  showAdditionalArea = false,
  data,
  href,
  absoluteLastPlayedAt = false,
}) => {
  return (
    <div className={cx('data-box-wrapper')}>
      {data.loading ? (
        <ClearLamp loading />
      ) : (
        <ClearLamp
          loading={false}
          clearLamp={(data.result && data.result.clearLamp) || null}
        />
      )}
      <div className={cx('data-box')}>
        <div className={cx('data-box-content')}>
          <div className={cx('score-box-wrapper')}>
            <dl className={cx('score-box')}>
              <div className={cx('data-list', 'ex-score')}>
                <dt>EX-SCORE</dt>
                <dd>
                  {!data.loading && (
                    <>
                      <span className={cx('score-text')}>
                        {data.result && data.result.score != null
                          ? data.result.score
                          : '-'}
                      </span>
                      <span className={cx('score-rate')}>
                        ({(digScoreRate(data.result) * 100).toFixed(2)} %)
                      </span>
                    </>
                  )}
                </dd>
              </div>

              {data.loading ? (
                <ScoreGraph loading />
              ) : (
                <ScoreGraph
                  grade={(data.result && data.result.gradeDiff.grade) || null}
                  scoreRate={digScoreRate(data.result)}
                  fullCombo={
                    !!(
                      data.result &&
                      data.result.clearLamp === ClearLampEnum.FullCombo
                    )
                  }
                />
              )}
            </dl>

            {showAdditionalArea && (
              <div className={cx('additional-area')}>
                {showBPI && (
                  <dl className={cx('data-list')}>
                    <dt>BPI</dt>
                    {data.loading ? (
                      <dd>-</dd>
                    ) : (
                      <dd className={cx('bpi')}>
                        {data.result && data.result.bpi != null
                          ? data.result.bpi.toFixed(2)
                          : '-'}
                      </dd>
                    )}
                  </dl>
                )}

                <dl className={cx('data-list', 'clear-type')}>
                  <dt>CLEAR TYPE</dt>
                  {data.loading ? (
                    <dd>-</dd>
                  ) : (
                    <dd
                      className={cx({
                        'full-combo':
                          data.result &&
                          data.result.clearLamp === ClearLampEnum.FullCombo,
                        'ex-hard-clear':
                          data.result &&
                          data.result.clearLamp === ClearLampEnum.ExHard,
                        'hard-clear':
                          data.result &&
                          data.result.clearLamp === ClearLampEnum.Hard,
                        clear:
                          data.result &&
                          data.result.clearLamp === ClearLampEnum.Normal,
                        'easy-clear':
                          data.result &&
                          data.result.clearLamp === ClearLampEnum.Easy,
                        'assist-clear':
                          data.result &&
                          data.result.clearLamp === ClearLampEnum.Assist,
                        failed:
                          data.result &&
                          data.result.clearLamp === ClearLampEnum.Failed,
                      })}
                    >
                      {data.result && data.result.clearLamp
                        ? clearTypeTexts[data.result.clearLamp]
                        : '-'}
                    </dd>
                  )}
                </dl>

                <dl className={cx('data-list')}>
                  <dt>LAST PLAY</dt>
                  {data.loading ? (
                    <dd>-</dd>
                  ) : (
                    <dd className={cx('moderate')}>
                      {data.result
                        ? absoluteLastPlayedAt
                          ? dayjs(data.result.lastPlayedAt).format(
                              formats.dateTime,
                            )
                          : dayjs(data.result.lastPlayedAt).fromNow()
                        : '-'}
                    </dd>
                  )}
                </dl>
              </div>
            )}
          </div>

          <div className={cx('symbol-area')}>
            {data.loading ? (
              <Grade loading />
            ) : (
              data.result &&
              !isZeroGradeDiff(data.result.nearestGradeDiff) && (
                <Grade
                  loading={false}
                  currentGrade={data.result.gradeDiff.grade}
                  nearestGradeDiff={data.result.nearestGradeDiff}
                />
              )
            )}
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

export default ResultBox
