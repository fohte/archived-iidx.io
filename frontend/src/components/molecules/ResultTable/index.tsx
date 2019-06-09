import * as classnames from 'classnames/bind'
import Link from 'next/link'
import * as React from 'react'

import Card from '@app/components/atoms/Card'
import ResultBox, { Result } from '@app/components/molecules/ResultBox'
import { Difficulty, PlayStyle } from '@app/queries'
import routes from '@app/routes'
import * as css from './style.scss'

const cx = classnames.bind(css)

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

          // The type of routes.findAndGetUrls is not defined,
          // so routes should cast to any
          const href = (routes as any).findAndGetUrls('map', {
            screenName,
            musicId: music.id,
            playStyle: map.playStyle.toLowerCase(),
            difficulty: map.difficulty.toLowerCase(),
          }).urls.as

          return (
            <div className={cx('card')}>
              <Link href={href}>
                <a className={cx('card-link')}>
                  <Card
                    key={i}
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
                      <ResultBox showBPI={showBPI} result={result} map={map} />
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
