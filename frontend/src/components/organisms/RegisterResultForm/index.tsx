import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import { isEmpty } from 'validator'

import Button from '@app/components/atoms/Button'
import RadioButton from '@app/components/atoms/RadioButton'
import ButtonGroup from '@app/components/molecules/ButtonGroup'
import { PlayStyle } from '@app/queries'
import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  onSubmit: (values: FormValues) => Promise<void> | void
}

export interface FormValues {
  csv: string
  playStyle: PlayStyle
}

const validators: {
  [key in keyof FormValues]: (
    value: FormValues[key] | null,
    allValues: FormValues,
  ) => string | undefined
} = {
  csv: (value, _) => {
    if (!value || isEmpty(value)) {
      return 'Please input CSV.'
    }
  },
  playStyle: (value, _) => {
    if (!value || isEmpty(value)) {
      return 'Please select SP or DP.'
    }
  },
}

const csvDownloadURL =
  'https://p.eagate.573.jp/game/2dx/26/djdata/score_download.html'

const RegisterResultForm = ({ onSubmit }: Props) => (
  <FinalForm
    onSubmit={onSubmit}
    mutators={{
      setPlayStyle: ([playStyle], state, utils) => {
        utils.changeValue(state, 'playStyle', () => playStyle)
      },
    }}
  >
    {({
      handleSubmit: innerHandleSubmit,
      mutators,
      pristine,
      submitting,
      touched,
      errors,
      hasValidationErrors,
    }) => (
      <div className={cx('register-result-form')}>
        <div className={cx('header')}>
          <h2>Register results from CSV</h2>
          <hr />
          <div className={cx('form-group')}>
            <div className={cx('label', 'inline')}>
              Links (e-AMUSEMENT GATE)
            </div>
            <ul className={cx('links')}>
              {[PlayStyle.Sp, PlayStyle.Dp].map(style => (
                <li key={style}>
                  <a
                    href={`${csvDownloadURL}?style=${style}`}
                    target="_blank"
                    onClick={() => {
                      mutators.setPlayStyle(style)
                    }}
                  >
                    {style}
                    <span className={cx('link-icon')}>
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={cx('content')}>
          <form onSubmit={innerHandleSubmit}>
            <div className={cx('form-group')}>
              <label className={cx('label')}>Play Style</label>
              <ButtonGroup className={cx('button-group')}>
                {['SP', 'DP'].map(playStyle => (
                  <FinalField
                    key={playStyle}
                    type="radio"
                    name="playStyle"
                    value={playStyle}
                    validate={validators.playStyle}
                  >
                    {({ input, meta }) => (
                      <RadioButton
                        {...input}
                        className={cx({
                          error: !!(meta.touched && meta.error),
                        })}
                      >
                        {playStyle}
                      </RadioButton>
                    )}
                  </FinalField>
                ))}
              </ButtonGroup>
              {touched && touched.playStyle && errors.playStyle && (
                <div className={cx('error-message')}>{errors.playStyle}</div>
              )}
            </div>

            <div className={cx('form-group')}>
              <FinalField name="csv" validate={validators.csv}>
                {({ input, meta }) => (
                  <>
                    <label className={cx('label')}>CSV</label>
                    <textarea
                      {...input}
                      className={cx('csv-area', {
                        error: !!(meta.touched && meta.error),
                      })}
                      placeholder="Paste CSV here"
                    />
                    {meta.touched && meta.error && (
                      <div className={cx('error-message')}>{meta.error}</div>
                    )}
                  </>
                )}
              </FinalField>
            </div>

            <Button
              type="submit"
              disabled={submitting || pristine || hasValidationErrors}
              loading={submitting}
            >
              Import
            </Button>
          </form>
        </div>
      </div>
    )}
  </FinalForm>
)

export default RegisterResultForm
