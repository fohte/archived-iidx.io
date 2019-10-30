import classnames from 'classnames/bind'
import * as React from 'react'

import Card from '@app/components/atoms/Card'
import routes from '@server/routes'
import { WithLoadingState } from '@app/lib/types'
import ResultBox, {
  Map as ResultBoxMap,
  CurrentResult as ResultBoxCurrentResult,
  OldResult as ResultBoxOldResult,
} from '@app/components/molecules/ResultBox'
import { Difficulty, PlayStyle } from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)
const { Link } = routes

export interface Music {
  number: number
  title: string
}

export interface Map extends ResultBoxMap {
  playStyle: PlayStyle
  difficulty: Difficulty
  level: number
  music: Music

  result: ResultBoxCurrentResult | null
  oldResult: ResultBoxOldResult | null
}

interface Data {
  map: Map
}

export interface Props {
  data: WithLoadingState<Data>
  screenName: string

  showBPI?: boolean
  showAdditionalArea?: boolean
  absoluteLastPlayedAt?: boolean
}

const ResultCard: React.FunctionComponent<Props> = ({
  data,
  screenName,
  ...resultBoxProps
}) => {
  if (data.loading) {
    return (
      <div className={cx('card')}>
        <Card
          header={
            <div className={cx('header')}>
              <div className={cx('label', 'loading')}>-</div>
              <div className={cx('title', 'loading')} />
            </div>
          }
          content={<ResultBox {...resultBoxProps} data={{ loading: true }} />}
          clickable={false}
        />
      </div>
    )
  }

  const { map } = data
  const { result, oldResult, music } = map

  const href = routes.findAndGetUrls('map', {
    screenName,
    musicNumber: music.number.toString(),
    playStyle: map.playStyle.toLowerCase(),
    difficulty: map.difficulty.toLowerCase(),
  }).urls.as

  return (
    <div className={cx('card')}>
      <Link route={href}>
        <a className={cx('card-link')}>
          <Card
            header={
              <div className={cx('header')}>
                <div
                  className={cx(
                    'label',
                    `difficulty-${map.difficulty.toLowerCase()}`,
                  )}
                >
                  ☆{map.level}
                </div>
                <div className={cx('title')}>{music.title}</div>
              </div>
            }
            content={
              <ResultBox
                {...resultBoxProps}
                data={{ loading: false, result, oldResult, map }}
              />
            }
          />
        </a>
      </Link>
    </div>
  )
}

export default ResultCard
