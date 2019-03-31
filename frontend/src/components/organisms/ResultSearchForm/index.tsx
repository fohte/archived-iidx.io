import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import * as _ from 'lodash'
import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import { Form, Segment } from 'semantic-ui-react'

import Button from '@app/components/atoms/Button'
import ErrorMessage from '@app/components/atoms/ErrorMessage'
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

const ResultSearchForm: React.SFC<Props> = ({ onSubmit, initialValues }) => {
  const [activePlayStyle, setActivePlayStyle] = React.useState<PlayStyle>(
    PlayStyle.Sp,
  )

  return (
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
                  <ButtonGroup className={cx('button-group')}>
                    {_.map(PlayStyle, playStyle => (
                      <FinalField
                        key={playStyle}
                        name="playStyle"
                        type="radio"
                        value={playStyle}
                      >
                        {({ input }) => (
                          <label>
                            <input
                              {...input}
                              onChange={e => {
                                input.onChange(e)
                                if (e.target.checked) {
                                  setActivePlayStyle(playStyle)
                                }
                              }}
                              type="radio"
                            />
                            <Button
                              as="div"
                              active={activePlayStyle === playStyle}
                            >
                              {playStyle}
                            </Button>
                          </label>
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

              {hasSubmitErrors && (
                <div className={cx('error-box')}>
                  <ErrorMessage>{submitError}</ErrorMessage>
                </div>
              )}
            </Segment.Group>
          </Form>
        </div>
      )}
    </FinalForm>
  )
}

export default ResultSearchForm
