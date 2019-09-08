import classnames from 'classnames/bind'
import * as React from 'react'
import spacetime from 'spacetime'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SSRContext from '@app/contexts/SSRContext'
import { WithLoadingState } from '@app/lib/types'
import resultDiff, {
  DifferableAttributes,
  formatDiff,
} from '@app/lib/resultDiff'
import ScoreGraph from '@app/components/atoms/ScoreGraph'
import Grade from '@app/components/atoms/Grade'
import ClearLamp from '@app/components/atoms/ClearLamp'
import { formats, relativeTimeFromNow } from '@app/lib/dateTime'
import {
  GradeDiff,
  Grade as GradeEnum,
  GradeDiffGrade,
  ClearLamp as ClearLampEnum,
} from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)

interface BaseResult {
  score?: number | null
  scoreRate?: number | null
  missCount?: number | null
  clearLamp?: ClearLampEnum | null
  bpi?: number | null
  lastPlayedAt: string
}

export interface CurrentResult extends BaseResult {
  gradeDiff: Pick<GradeDiff, 'grade'>
  nearestGradeDiff: GradeDiff
}

export type OldResult = BaseResult

export interface Map {
  numNotes: number
}

export interface Data {
  result: CurrentResult | null
  oldResult: OldResult | null
  map: Map
}

export interface Props {
  showBPI?: boolean
  showAdditionalArea?: boolean
  data: WithLoadingState<Data>
  absoluteLastPlayedAt?: boolean
}

const isZeroGradeDiff = ({ grade, diff }: GradeDiff) =>
  grade === GradeDiffGrade.F && diff === 0

const digScoreRate = (result: Data['result']): number =>
  (result && result.scoreRate) || 0

const getClearLampText = (result: BaseResult | null): string => {
  if (result == null || result.clearLamp == null) {
    return 'NO PLAY'
  }

  switch (result.clearLamp) {
    case ClearLampEnum.FullCombo:
      return 'FULL COMBO'
    case ClearLampEnum.ExHard:
      return 'EX-HARD'
    case ClearLampEnum.Hard:
      return 'HARD'
    case ClearLampEnum.Normal:
      return 'CLEAR'
    case ClearLampEnum.Easy:
      return 'EASY'
    case ClearLampEnum.Assist:
      return 'ASSIST'
    case ClearLampEnum.Failed:
      return 'FAILED'
  }

  return 'NO PLAY'
}

const getClearLampClassName = (result: BaseResult | null): string | null => {
  if (result == null || result.clearLamp == null) {
    return null
  }

  switch (result.clearLamp) {
    case ClearLampEnum.FullCombo:
      return 'full-combo'
    case ClearLampEnum.ExHard:
      return 'ex-hard-clear'
    case ClearLampEnum.Hard:
      return 'hard-clear'
    case ClearLampEnum.Normal:
      return 'clear'
    case ClearLampEnum.Easy:
      return 'easy-clear'
    case ClearLampEnum.Assist:
      return 'assist-clear'
    case ClearLampEnum.Failed:
      return 'failed'
  }

  return null
}

const findGrade = (data: Data): GradeEnum | null => {
  if (data.result == null) {
    return null
  }

  const {
    result: {
      gradeDiff: { grade },
    },
  } = data

  switch (grade) {
    case GradeDiffGrade.Max:
    case GradeDiffGrade.Aaa:
      return GradeEnum.Aaa
    case GradeDiffGrade.Aa:
      return GradeEnum.Aa
    case GradeDiffGrade.A:
      return GradeEnum.A
    case GradeDiffGrade.B:
      return GradeEnum.B
    case GradeDiffGrade.C:
      return GradeEnum.C
    case GradeDiffGrade.D:
      return GradeEnum.D
    case GradeDiffGrade.E:
      return GradeEnum.E
    case GradeDiffGrade.F:
      return GradeEnum.F
  }
}

interface DiffWrapperProps {
  result: Data['result']
  oldResult: Data['oldResult']
  attribute: DifferableAttributes
  children: (
    pn: 'positive' | 'negative' | 'zero',
    diff: number,
  ) => React.ReactNode
}

const DiffWrapper: React.FC<DiffWrapperProps> = props => {
  const diff = resultDiff[props.attribute](props.result, props.oldResult)

  const pn =
    diff === 0
      ? 'zero'
      : props.attribute === 'missCount'
      ? diff > 0
        ? 'negative'
        : 'positive'
      : diff > 0
      ? 'positive'
      : 'negative'

  return <>{props.children(pn, diff)}</>
}

const ResultBox: React.FunctionComponent<Props> = ({
  showBPI = false,
  showAdditionalArea = false,
  data,
  absoluteLastPlayedAt = false,
}) => {
  const ssr = React.useContext(SSRContext)

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
                      <div className={cx('score-info')}>
                        <div className={cx('score-text')}>
                          {data.result && data.result.score != null
                            ? data.result.score
                            : '-'}
                        </div>
                        <DiffWrapper
                          result={data.result}
                          oldResult={data.oldResult}
                          attribute="score"
                        >
                          {(pn, diff) =>
                            pn !== 'zero' && (
                              <div className={cx('score-diff-info', pn)}>
                                <div className={cx('score-text')}>
                                  {formatDiff(diff)}
                                </div>
                              </div>
                            )
                          }
                        </DiffWrapper>
                      </div>
                      <div className={cx('score-info')}>
                        <div className={cx('score-rate')}>
                          ({(digScoreRate(data.result) * 100).toFixed(2)} %)
                        </div>
                        <DiffWrapper
                          result={data.result}
                          oldResult={data.oldResult}
                          attribute="scoreRate"
                        >
                          {(pn, diff) =>
                            pn !== 'zero' && (
                              <div className={cx('score-diff-info', pn)}>
                                <div className={cx('score-rate')}>
                                  ({formatDiff(diff * 100, 2)} %)
                                </div>
                              </div>
                            )
                          }
                        </DiffWrapper>
                      </div>
                    </>
                  )}
                </dd>
              </div>

              {data.loading ? (
                <ScoreGraph loading />
              ) : (
                <ScoreGraph
                  grade={findGrade(data)}
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
                        <span>
                          {data.result && data.result.bpi != null
                            ? data.result.bpi.toFixed(2)
                            : '-'}
                        </span>
                        <DiffWrapper
                          result={data.result}
                          oldResult={data.oldResult}
                          attribute="bpi"
                        >
                          {(pn, diff) =>
                            pn !== 'zero' && (
                              <span className={cx('score-diff-info', pn)}>
                                ({formatDiff(diff, 2)})
                              </span>
                            )
                          }
                        </DiffWrapper>
                      </dd>
                    )}
                  </dl>
                )}

                <dl className={cx('data-list', 'clear-type')}>
                  <dt>CLEAR TYPE</dt>
                  {data.loading ? (
                    <dd>-</dd>
                  ) : (
                    <dd>
                      {getClearLampText(data.oldResult) !==
                        getClearLampText(data.result) && (
                        <>
                          <div
                            className={cx(
                              'moderate',
                              getClearLampClassName(data.oldResult),
                            )}
                          >
                            {getClearLampText(data.oldResult)}
                          </div>
                          <div
                            className={cx('moderate', 'clear-type-diff-icon')}
                          >
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </>
                      )}
                      <div
                        className={cx(
                          'moderate',
                          getClearLampClassName(data.result),
                        )}
                      >
                        {getClearLampText(data.result)}
                      </div>
                    </dd>
                  )}
                </dl>

                <dl className={cx('data-list')}>
                  <dt>LAST PLAY</dt>
                  {ssr || data.loading ? (
                    <dd>-</dd>
                  ) : (
                    <dd className={cx('moderate')}>
                      {data.result
                        ? absoluteLastPlayedAt
                          ? spacetime(data.result.lastPlayedAt).format(
                              formats.dateTime,
                            )
                          : relativeTimeFromNow(
                              spacetime(data.result.lastPlayedAt),
                            )
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
      </div>
    </div>
  )
}

export default ResultBox
