import { faSlidersH, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import * as _ from 'lodash'
import * as React from 'react'
import { Form as FinalForm } from 'react-final-form'

import Alert from '@app/components/atoms/Alert'
import { Difficulty, PlayStyle } from '@app/queries'
import * as css from './style.scss'

const cx = classnames.bind(css)

export type FormValues = {
  title?: string | null
  playStyle: PlayStyle
  difficulties: Difficulty[]
  levels: number[]
}

export type Props = {
  onSubmit: (values: FormValues) => void
  playStyle: PlayStyle
}

const ResultSearchForm: React.SFC<Props> = ({ onSubmit, playStyle }) => {
  const initialValues = {
    playStyle,
    difficulties: [],
    levels: [],
  }

  return (
    <FinalForm onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, hasSubmitErrors, submitError }) => (
        <form className={cx('result-search-form')} onSubmit={handleSubmit}>
          <div className={cx('filter-area')}>
            <div className={cx('filter-button')}>
              <span className={cx('filter-icon')}>
                <FontAwesomeIcon icon={faSlidersH} />
              </span>
              Filter
            </div>
            <div className={cx('filter-button')}>
              <span className={cx('filter-icon')}>
                <FontAwesomeIcon icon={faSortAmountDown} />
              </span>
              Sort By
            </div>
          </div>

          {hasSubmitErrors && (
            <div className={cx('error-box')}>
              <Alert>{submitError}</Alert>
            </div>
          )}
        </form>
      )}
    </FinalForm>
  )
}

export default ResultSearchForm
