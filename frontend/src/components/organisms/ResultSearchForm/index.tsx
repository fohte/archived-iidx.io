import { faSlidersH, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import * as _ from 'lodash'
import * as React from 'react'

import FilterForm, { FormValues } from '@app/components/organisms/FilterForm'
import { PlayStyle } from '@app/queries'
import * as css from './style.scss'

const cx = classnames.bind(css)

export type Props = {
  onSubmit: (values: FormValues) => void
  playStyle: PlayStyle
}

const ResultSearchForm: React.SFC<Props> = ({ onSubmit, playStyle }) => {
  const [showFilterForm, setFilterFormShown] = React.useState(false)

  return (
    <>
      {showFilterForm && (
        <FilterForm
          onCloseRequested={() => {
            setFilterFormShown(false)
          }}
          onSubmit={onSubmit}
          playStyle={playStyle}
        />
      )}

      <div className={cx('filter-area')}>
        <button
          className={cx('filter-button')}
          onClick={() => {
            setFilterFormShown(true)
          }}
        >
          <span className={cx('filter-icon')}>
            <FontAwesomeIcon icon={faSlidersH} />
          </span>
          Filter
        </button>

        <button className={cx('filter-button')}>
          <span className={cx('filter-icon')}>
            <FontAwesomeIcon icon={faSortAmountDown} />
          </span>
          Sort By
        </button>
      </div>
    </>
  )
}

export default ResultSearchForm
