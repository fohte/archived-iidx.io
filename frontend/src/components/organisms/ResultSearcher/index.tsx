import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames/bind'
import * as React from 'react'

import FilterForm from '@app/components/organisms/FilterForm'
import SearchInput from '@app/components/atoms/SearchInput'
import ResultSearcherContext from '@app/contexts/ResultSearcherContext'
import { isEmpty } from '@app/models/FilterFormValue'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {}

const ResultSearcher: React.SFC<Props> = () => {
  const {
    values: { filterForm },
  } = React.useContext(ResultSearcherContext)

  const [showResultSearcher, setResultSearcherShown] = React.useState(false)

  return (
    <>
      {showResultSearcher && (
        <FilterForm
          onCloseRequested={() => {
            setResultSearcherShown(false)
          }}
        />
      )}

      <div className={cx('form-control-area')}>
        <div className={cx('filter-area')}>
          <SearchInput className={cx('search')} />
          <button
            className={cx('filter-button', { active: !isEmpty(filterForm) })}
            onClick={() => {
              setResultSearcherShown(true)
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

export default ResultSearcher
