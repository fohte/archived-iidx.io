import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export type Props = {
  onCloseRequested: () => void
}

const FilterForm: React.SFC<Props> = ({ onCloseRequested }) => {
  return (
    <div className={cx('filter-form')}>
      <div
        onClick={() => {
          onCloseRequested()
        }}
      >
        close
      </div>
    </div>
  )
}

export default FilterForm
