import * as React from 'react'
import classnames from 'classnames/bind'

import { GradeDiff, Grade as GradeEnum } from '@app/queries'
import { WithLoadingState } from '@app/lib/types'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface DataProps {
  currentGrade: GradeEnum
  nearestGradeDiff: GradeDiff
}

const formatDiff = (diff: number): string =>
  diff >= 0 ? `+${diff}` : diff.toString()

export type Props = WithLoadingState<DataProps>

const Grade: React.FC<Props> = props => {
  if (props.loading) {
    return <div className={cx('grade-box', 'loading')}></div>
  }

  const { currentGrade, nearestGradeDiff } = props

  return (
    <div className={cx('grade-box')}>
      <div className={cx('current-grade')}>{currentGrade}</div>
      <div className={cx('around-grade')}>
        {nearestGradeDiff.grade} {formatDiff(nearestGradeDiff.diff)}
      </div>
    </div>
  )
}

export default Grade
