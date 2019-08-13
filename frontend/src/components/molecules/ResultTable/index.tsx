import classnames from 'classnames/bind'
import * as _ from 'lodash'
import * as React from 'react'

import Card from '@app/components/atoms/Card'
import ResultBox, { Result } from '@app/components/molecules/ResultBox'
import { Difficulty, PlayStyle } from '@app/queries'
import routes from '@app/routes'

import * as css from './style.scss'

const cx = classnames.bind(css)
const { Link } = routes

export interface Music {
  id: string
  title: string
}

export interface Map {
  id: string
  numNotes: number
  level: number
  difficulty: Difficulty
  playStyle: PlayStyle
  result?: Result | null
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
              <div className={cx('card')} key={n}>
                <Card
                  header={
                    <div className={cx('header')}>
                      <div className={cx('label', 'loading')}>-</div>
                      <div className={cx('title', 'loading')} />
                    </div>
                  }
                  content={
                    <ResultBox
                      showBPI
                      showAdditionalArea
                      data={{ loading: true }}
                    />
                  }
                  clickable={false}
                />
              </div>
            ))
          : data.maps.map(map => {
              const { result, music } = map

              // The type of routes.findAndGetUrls is not defined,
              // so routes should cast to any
              const href = (routes as any).findAndGetUrls('map', {
                screenName,
                musicId: music.id,
                playStyle: map.playStyle.toLowerCase(),
                difficulty: map.difficulty.toLowerCase(),
              }).urls.as

              return (
                <div className={cx('card')} key={map.id}>
                  <Link route={href}>
                    <a className={cx('card-link')}>
                      <Card
                        header={
                          <div className={cx('header')}>
                            <div
                              className={cx('label', {
                                'difficulty-another':
                                  map.difficulty === Difficulty.Another,
                                'difficulty-hyper':
                                  map.difficulty === Difficulty.Hyper,
                                'difficulty-normal':
                                  map.difficulty === Difficulty.Normal,
                              })}
                            >
                              ☆{map.level}
                            </div>
                            <div className={cx('title')}>{music.title}</div>
                          </div>
                        }
                        content={
                          <ResultBox
                            showBPI={showBPI}
                            showAdditionalArea
                            data={{ loading: false, result, map }}
                          />
                        }
                      />
                    </a>
                  </Link>
                </div>
              )
            })}
      </div>
    </>
  )
}

export default ResultTable
