import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames/bind'
import * as React from 'react'

import FilterForm from '@app/components/organisms/FilterForm'
import SearchInput from '@app/components/atoms/SearchInput'

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

      <div className={cx('form-control-area')}>
        <div className={cx('filter-area')}>
          <SearchInput className={cx('search')} />
          <button
            className={cx('filter-button')}
            onClick={() => {
              setFilterFormShown(true)
            }}
          >
            Filter
            <span className={cx('filter-icon')}>
              <FontAwesomeIcon icon={faSlidersH} />
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default ResultSearchForm
