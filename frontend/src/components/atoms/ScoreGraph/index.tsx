import * as classnames from 'classnames/bind'
import * as React from 'react'

import { Grade } from '@app/lib/score'
import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  grade: Grade | null
  scoreRate: number
  fullCombo: boolean
}

const ScoreGraph: React.SFC<Props> = ({ grade, scoreRate, fullCombo }) => (
  <div className={cx('wrapper')}>
    <div
      className={cx('progress', {
        'grade-aaa': grade === Grade.AAA,
        'grade-aa': grade === Grade.AA,
        'grade-a': grade === Grade.A,
        'grade-b': grade === Grade.B,
        'grade-c': grade === Grade.C,
        'grade-d': grade === Grade.D,
        'grade-e': grade === Grade.E,
        'grade-f': grade === Grade.F,
        'full-combo': fullCombo,
      })}
      style={{ width: `${scoreRate}%` }}
    />
    <div className={cx('target', 'grade-a')} />
    <div className={cx('target', 'grade-aa')} />
    <div className={cx('target', 'grade-aaa')} />
  </div>
)

export default ScoreGraph
