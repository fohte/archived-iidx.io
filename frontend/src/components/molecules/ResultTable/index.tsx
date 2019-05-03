import * as classnames from 'classnames/bind'
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
      <div>
        {maps.map((map, i) => {
          const { result, music } = map

          return (
            <Card
              className={cx('card')}
              key={i}
              header={
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
              }
              content={
                <ResultBox
                  showBPI={showBPI}
                  result={result}
                  map={map}
                  href={
                    // The type of routes.findAndGetUrls is not defined,
                    // so routes should cast to any
                    (routes as any).findAndGetUrls('map', {
                      screenName,
                      musicId: music.id,
                      playStyle: map.playStyle.toLowerCase(),
                      difficulty: map.difficulty.toLowerCase(),
                    }).urls.as
                  }
                />
              }
            />
          )
        })}
      </div>
    </>
  )
}

export default ResultTable
