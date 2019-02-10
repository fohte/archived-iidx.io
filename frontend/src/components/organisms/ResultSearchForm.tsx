import * as _ from 'lodash'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import { Form, Message, Segment } from 'semantic-ui-react'

import { Difficulty, PlayStyle } from '@app/queries'

export type FormValues = {
  title: string
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
      submitting,
      submitError,
    }) => (
      <Form onSubmit={handleSubmit} error={hasSubmitErrors}>
        <Segment.Group>
          <Segment basic>
            <FinalField name="title">
              {({ input }) => (
                <Form.Input
                  {...input}
                  type="text"
                  placeholder="Search..."
                  fluid
                  action={{
                    disabled: submitting || hasValidationErrors,
                    loading: submitting,
                    content: 'Search',
                  }}
                />
              )}
            </FinalField>
          </Segment>

          <Segment secondary basic>
            <Form.Group inline>
              <label>Play Style</label>
              {_.map(PlayStyle, playStyle => (
                <FinalField
                  key={playStyle}
                  name="playStyle"
                  type="radio"
                  value={playStyle}
                >
                  {({ input }) => (
                    <Form.Radio
                      {...input}
                      label={playStyle}
                      onChange={(_e, { value }) => {
                        input.onChange(value)
                      }}
                    />
                  )}
                </FinalField>
              ))}
            </Form.Group>

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
                      onChange={(_e, { checked }) => {
                        inputProps.onChange({
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
                      onChange={(_e, { checked }) => {
                        inputProps.onChange({
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
          </Segment>

          {hasSubmitErrors && <Message error content={submitError} />}
        </Segment.Group>
      </Form>
    )}
  </FinalForm>
)

export default ResultSearchForm
