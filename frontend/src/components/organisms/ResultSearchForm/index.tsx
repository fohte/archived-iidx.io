import { faSlidersH, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames/bind'
import * as _ from 'lodash'
import * as React from 'react'

import FilterForm, { FormValues } from '@app/components/organisms/FilterForm'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  formValues: FormValues
  onSubmit: (values: FormValues) => void
}

const ResultSearchForm: React.SFC<Props> = ({ formValues, onSubmit }) => {
  const [showFilterForm, setFilterFormShown] = React.useState(false)

  return (
    <>
      {showFilterForm && (
        <FilterForm
          initialValues={formValues}
          onCloseRequested={() => {
            setFilterFormShown(false)
          }}
          onSubmit={onSubmit}
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
