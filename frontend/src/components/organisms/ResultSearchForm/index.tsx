import { faSlidersH, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames/bind'
import * as _ from 'lodash'
import * as React from 'react'

import FilterForm from '@app/components/organisms/FilterForm'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {}

const ResultSearchForm: React.SFC<Props> = () => {
  const [showFilterForm, setFilterFormShown] = React.useState(false)

  return (
    <>
      {showFilterForm && (
        <FilterForm
          onCloseRequested={() => {
            setFilterFormShown(false)
          }}
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
