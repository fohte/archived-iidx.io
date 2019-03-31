import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import * as _ from 'lodash'
import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import { Form, Message, Segment } from 'semantic-ui-react'

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
        <Form onSubmit={handleSubmit} error={hasSubmitErrors}>
          <Segment.Group>
            <Segment secondary basic>
              <div className={cx('search-form')}>
                <div className={cx('play-style-button-group')}>
                  {_.map(PlayStyle, playStyle => (
                    <FinalField
                      key={playStyle}
                      name="playStyle"
                      type="radio"
                      value={playStyle}
                    >
                      {({ input }) => (
                        <div className={cx('play-style-button-box')}>
                          <label>
                            <input {...input} type="radio" />
                            <span className={cx('play-style-button')}>
                              {playStyle}
                            </span>
                          </label>
                        </div>
                      )}
                    </FinalField>
                  ))}
                </div>

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

              <div className={cx('filter-form')}>
                <Form.Group inline>
                  <label>Difficulty</label>
                  {_.map(Difficulty, difficulty => (
                    <FinalField
                      key={difficulty}
                      name="difficulties"
                      type="checkbox"
                      value={difficulty}
                    >
                      {({ input: { value: _value, ...inputProps } }) => (
                        <Form.Checkbox
                          {...inputProps}
                          label={difficulty}
                          onChange={(event, { checked }) => {
                            inputProps.onChange({
                              ...event,
                              target: {
                                type: 'checkbox',
                                checked,
                              },
                            })
                          }}
                        />
                      )}
                    </FinalField>
                  ))}
                </Form.Group>

                <Form.Group inline>
                  <label>Level</label>
                  {_.range(1, 12 + 1).map(level => (
                    <FinalField
                      key={level}
                      name="levels"
                      type="checkbox"
                      value={level}
                    >
                      {({ input: { value: _value, ...inputProps } }) => (
                        <Form.Checkbox
                          {...inputProps}
                          label={`☆${level}`}
                          onChange={(event, { checked }) => {
                            inputProps.onChange({
                              ...event,
                              target: {
                                type: 'checkbox',
                                checked,
                              },
                            })
                          }}
                        />
                      )}
                    </FinalField>
                  ))}
                </Form.Group>
              </div>
            </Segment>

            {hasSubmitErrors && <Message error content={submitError} />}
          </Segment.Group>
        </Form>
      </div>
    )}
  </FinalForm>
)

export default ResultSearchForm
