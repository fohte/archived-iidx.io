import classnames from 'classnames/bind'
import dayjs from 'dayjs'
import * as _ from 'lodash'
import * as React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import Box from '@app/components/atoms/Box'
import ResultBox, {
  CurrentResult as ResultBoxCurrentResult,
  Map as ResultBoxMap,
} from '@app/components/molecules/ResultBox'
import { formats, formatUnixTime } from '@app/lib/dateTime'
import { generateTextageURL } from '@app/lib/textage'
import { Difficulty, Grade, PlayStyle } from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Music {
  title: string
  genre: string
  artist: string
  series: number
  textageUid: string
}

export interface Map extends ResultBoxMap {
  level: number
  playStyle: PlayStyle
  difficulty: Difficulty
  minBpm: number
  maxBpm: number
  numNotes: number
}

export interface ResultLog {
  score?: number | null
  scoreRate?: number | null
  lastPlayedAt: string
}

export interface Props {
  music: Music
  map: Map
  result?: ResultBoxCurrentResult
  allResults: ResultLog[]
  screenName: string
}

const calcGradeBorder = (coefficients: number, numNotes: number) =>
  Math.ceil(numNotes * 2 * coefficients)

const getGradeBorders = (numNotes: number): { [key in Grade]: number } => ({
  [Grade.F]: 0,
  [Grade.E]: calcGradeBorder(numNotes, 2 / 9),
  [Grade.D]: calcGradeBorder(numNotes, 3 / 9),
  [Grade.C]: calcGradeBorder(numNotes, 4 / 9),
  [Grade.B]: calcGradeBorder(numNotes, 5 / 9),
  [Grade.A]: calcGradeBorder(numNotes, 6 / 9),
  [Grade.Aa]: calcGradeBorder(numNotes, 7 / 9),
  [Grade.Aaa]: calcGradeBorder(numNotes, 8 / 9),
  [Grade.Max]: numNotes * 2,
})

const MapDetail: React.SFC<Props> = ({ music, map, result, allResults }) => {
  const gradeBorders = getGradeBorders(map.numNotes)

  return (
    <>
      <Box className={cx('box', 'map-detail')}>
        <div className={cx('music-data')}>
          <div className={cx('genre')}>{music.genre}</div>
          <h2 className={cx('title')}>{music.title}</h2>
          <div className={cx('artist')}>{music.artist}</div>
        </div>

        <ul>
          <li>
            <div
              className={cx('difficulty-area', {
                'difficulty-another': map.difficulty === Difficulty.Another,
                'difficulty-hyper': map.difficulty === Difficulty.Hyper,
                'difficulty-normal': map.difficulty === Difficulty.Normal,
              })}
            >
              <span className={cx('level')}>☆{map.level}</span>
              <span className={cx('difficulty')}>
                {map.playStyle} {map.difficulty}
              </span>
            </div>
          </li>
        </ul>

        <table className={cx('map-data-table')}>
          <tbody>
            <tr>
              <th>BPM</th>
              <td>
                <div className={cx('bpm')}>
                  {map.minBpm === map.maxBpm
                    ? `${map.maxBpm}`
                    : `${map.minBpm}-${map.maxBpm}`}
                </div>
              </td>
            </tr>
            <tr>
              <th>Notes</th>
              <td>{map.numNotes}</td>
            </tr>
            <tr>
              <th>TexTage</th>
              <td>
                <ul className={cx('textage-links')}>
                  {map.playStyle === PlayStyle.Sp ? (
                    [1, 2].map((playSide: 1 | 2) => (
                      <li key={playSide}>
                        <a
                          href={generateTextageURL(music, map, {
                            playStyle: PlayStyle.Sp,
                            playSide,
                          })}
                        >{`${playSide}P`}</a>
                      </li>
                    ))
                  ) : (
                    <li>
                      <a
                        href={generateTextageURL(music, map, {
                          playStyle: PlayStyle.Dp,
                        })}
                      >
                        DP
                      </a>
                    </li>
                  )}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>

      <Box className={cx('box')}>
        <div className={cx('box-header')}>
          <h2>Best Score</h2>
        </div>
        <ResultBox
          showBPI
          showAdditionalArea
          data={{ loading: false, result, map }}
          absoluteLastPlayedAt
        />
      </Box>

      <Box className={cx('box')}>
        <div className={cx('box-header')}>
          <h2>Score Trends</h2>
        </div>

        <div
          className={cx('chart-wrapper', {
            'chart-unavailable': allResults.length === 0,
          })}
        >
          {allResults.length === 0 && (
            <div className={cx('chart-unavailable-text')}>No data points</div>
          )}

          <div className={cx('chart-container')}>
            <ResponsiveContainer height={300}>
              <AreaChart
                data={allResults
                  .filter(({ score }) => score != null)
                  .map(({ score, lastPlayedAt }) => ({
                    score,
                    lastPlayedAt: dayjs(lastPlayedAt).unix(),
                  }))}
                // モバイル端末でタップしたときに hover と同じ動作をさせるためのハック
                // https://github.com/recharts/recharts/issues/754#issuecomment-430477790
                onClick={() => {
                  /* Nop */
                }}
                className={cx('chart')}
                margin={{ right: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="lastPlayedAt"
                  tickFormatter={item => formatUnixTime(item, formats.date)}
                  domain={['dataMin', 'dataMax']}
                  type="number"
                />
                <YAxis
                  domain={[
                    dataMin => _.max([dataMin - 20, 0]),
                    dataMax => _.min([dataMax + 20, map.numNotes * 2]),
                  ]}
                />
                <Tooltip
                  labelFormatter={label =>
                    formatUnixTime(label, formats.dateTime)
                  }
                  formatter={(value: number) =>
                    `${value} (${(
                      ((result && result.scoreRate) || 0) * 100
                    ).toFixed(2)}%)`
                  }
                />
                {_.map(gradeBorders, (gradeBorder, grade) => (
                  <ReferenceLine key={grade} y={gradeBorder} stroke="#999">
                    <Label position="right" value={grade} color="#999" />
                  </ReferenceLine>
                ))}
                <ReferenceLine
                  y={calcGradeBorder(map.numNotes, 8.5 / 9)}
                  stroke="#999"
                >
                  <Label position="right" value="MAX-" color="#999" />
                </ReferenceLine>
                <Area
                  dataKey="score"
                  stroke="#1164a4"
                  strokeWidth={2}
                  isAnimationActive={false}
                  fillOpacity={0.2}
                  dot={{ fill: 'white', fillOpacity: 1 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Box>
    </>
  )
}

export default MapDetail
