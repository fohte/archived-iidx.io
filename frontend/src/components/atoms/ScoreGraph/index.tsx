import classnames from 'classnames/bind'
import * as React from 'react'

import { Grade } from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)

export type Props =
  | {
      loading?: false
      grade: Grade | null
      scoreRate: number
      fullCombo: boolean
    }
  | {
      loading: true
    }

const ScoreGraph: React.SFC<Props> = props => {
  if (props.loading) {
    return <div className={cx('wrapper', 'loading')} />
  } else {
    const { grade, scoreRate, fullCombo } = props
    return (
      <div className={cx('wrapper')}>
        <div
          className={cx('progress', {
            'grade-aaa': grade === Grade.Aaa,
            'grade-aa': grade === Grade.Aa,
            'grade-a': grade === Grade.A,
            'grade-b': grade === Grade.B,
            'grade-c': grade === Grade.C,
            'grade-d': grade === Grade.D,
            'grade-e': grade === Grade.E,
            'grade-f': grade === Grade.F,
            'full-combo': fullCombo,
          })}
          style={{ width: `${scoreRate * 100}%` }}
        />
        <div className={cx('target', 'grade-a')} />
        <div className={cx('target', 'grade-aa')} />
        <div className={cx('target', 'grade-aaa')} />
      </div>
    )
  }
}

export default ScoreGraph
