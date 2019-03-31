import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import * as _ from 'lodash'
import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'

import ErrorMessage from '@app/components/atoms/ErrorMessage'
import RadioButton from '@app/components/atoms/RadioButton'
import ButtonGroup from '@app/components/molecules/ButtonGroup'
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
  initialValues: FormValues
}

const ResultSearchForm: React.SFC<Props> = ({ onSubmit, initialValues }) => (
  <FinalForm onSubmit={onSubmit} initialValues={initialValues}>
    {({
      handleSubmit,
      hasValidationErrors,
      hasSubmitErrors,
      pristine,
      submitting,
      submitError,
    }) => (
      <div className={cx('form')}>
        <form onSubmit={handleSubmit}>
          <div className={cx('search-form')}>
            <ButtonGroup className={cx('button-group')}>
              {_.map(PlayStyle, playStyle => (
                <FinalField
                  key={playStyle}
                  name="playStyle"
                  type="radio"
                  value={playStyle}
                >
                  {({ input }) => (
                    <RadioButton {...input}>{playStyle}</RadioButton>
                  )}
                </FinalField>
              ))}
            </ButtonGroup>

            <div className={cx('search-input-group')}>
              <FinalField name="title">
                {({ input }) => (
                  <input
                    {...input}
                    className={cx('search-area')}
                    type="text"
                    placeholder="Search..."
                  />
                )}
              </FinalField>
              <button
                type="submit"
                className={cx({ loading: submitting })}
                disabled={submitting || pristine || hasValidationErrors}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          {hasSubmitErrors && (
            <div className={cx('error-box')}>
              <ErrorMessage>{submitError}</ErrorMessage>
            </div>
          )}
        </form>
      </div>
    )}
  </FinalForm>
)

export default ResultSearchForm
