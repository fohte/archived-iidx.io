import * as classnames from 'classnames/bind'
import * as React from 'react'

import Box from '@app/components/atoms/Box'
import Card from '@app/components/atoms/Card'
import ResultBox, { Result } from '@app/components/molecules/ResultBox'
import { generateTextageURL } from '@app/lib/textage'
import { Difficulty, PlayStyle } from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Music {
  title: string
  genre: string
  artist: string
  series: number
  textageUid: string
}

export interface Map {
  level: number
  playStyle: PlayStyle
  difficulty: Difficulty
  minBpm: number
  maxBpm: number
  numNotes: number
}

export type Props = {
  music: Music
  map: Map
  result?: Result
  screenName: string
}

const MapDetail: React.SFC<Props> = ({ music, map, result }) => (
  <>
    <Box transparent className={cx('map-detail')}>
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

    <Card
      header={<span className={cx('card-title')}>Best Score</span>}
      content={<ResultBox showBPI result={result} map={map} />}
    />
  </>
)

export default MapDetail
