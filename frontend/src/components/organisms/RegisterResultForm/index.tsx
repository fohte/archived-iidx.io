import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames/bind'
import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import { isEmpty } from 'validator'

import Box from '@app/components/atoms/Box'
import Button from '@app/components/atoms/Button'
import FormGroup from '@app/components/atoms/FormGroup'
import RadioButton from '@app/components/atoms/RadioButton'
import Textarea from '@app/components/atoms/Textarea'
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
      form: { mutators },
      pristine,
      submitting,
      touched,
      errors,
      hasValidationErrors,
    }) => (
      <div className={cx('register-result-form')}>
        <Box transparent className={cx('header')}>
          <h2>Register results from CSV</h2>
          <hr />
          <FormGroup label="Links (e-AMUSEMENT GATE)">
            <ul className={cx('links')}>
              {[PlayStyle.Sp, PlayStyle.Dp].map(style => (
                <li key={style}>
                  <a
                    href={`${csvDownloadURL}?style=${style}`}
                    target="_blank"
                    rel="noopener noreferrer"
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
          </FormGroup>
        </Box>

        <Box>
          <form onSubmit={innerHandleSubmit}>
            <FormGroup
              label="Play Style"
              error={!!(touched && touched.playStyle && errors.playStyle)}
              errorMessage={errors.playStyle ? errors.playStyle : undefined}
            >
              <ButtonGroup className={cx('button-group')}>
                {['SP', 'DP'].map((playStyle: PlayStyle) => (
                  <FinalField
                    key={playStyle}
                    type="radio"
                    name="playStyle"
                    value={playStyle}
                    validate={validators.playStyle}
                  >
                    {({ input, meta }) => (
                      <RadioButton
                        button
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
            </FormGroup>

            <FinalField<string> name="csv" validate={validators.csv}>
              {({ input, meta }) => (
                <FormGroup
                  label="CSV"
                  error={!!(meta.touched && meta.error)}
                  errorMessage={meta.error}
                >
                  <Textarea
                    {...input}
                    error={!!(meta.touched && meta.error)}
                    placeholder="Paste CSV here"
                  />
                </FormGroup>
              )}
            </FinalField>
            <Button
              type="submit"
              disabled={submitting || pristine || hasValidationErrors}
              loading={submitting}
            >
              Import
            </Button>
          </form>
        </Box>
      </div>
    )}
  </FinalForm>
)

export default RegisterResultForm
