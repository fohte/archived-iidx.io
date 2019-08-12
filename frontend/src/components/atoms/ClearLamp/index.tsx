import * as React from 'react'
import classnames from 'classnames/bind'

import { ClearLamp as ClearLampEnum } from '@app/queries'
import { WithLoadingState } from '@app/lib/types'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface DataProps {
  clearLamp: ClearLampEnum | null
}

export type Props = WithLoadingState<DataProps>

const ClearLamp: React.FC<Props> = props => {
  if (props.loading) {
    return <div className={cx('clear-lamp', 'loading')}></div>
  }

  const { clearLamp } = props

  return (
    <div
      className={cx('clear-lamp', {
        'full-combo': clearLamp === ClearLampEnum.FullCombo,
        'ex-hard-clear': clearLamp === ClearLampEnum.ExHard,
        'hard-clear': clearLamp === ClearLampEnum.Hard,
        clear: clearLamp === ClearLampEnum.Normal,
        'easy-clear': clearLamp === ClearLampEnum.Easy,
        'assist-clear': clearLamp === ClearLampEnum.Assist,
        failed: clearLamp === ClearLampEnum.Failed,
      })}
    />
  )
}

export default ClearLamp
