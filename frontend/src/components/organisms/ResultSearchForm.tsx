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
  handleSubmit: () => void
}

const ResultSearchForm: React.SFC<Props> = ({ handleSubmit }) => (
  <FinalForm onSubmit={handleSubmit}>
    {({
      handleSubmit: innerHandleSubmit,
      hasValidationErrors,
      hasSubmitErrors,
      submitting,
      submitError,
    }) => (
      <Form onSubmit={innerHandleSubmit} error={hasSubmitErrors}>
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
                <FinalField name="playStyle">
                  {({ input }) => (
                    <Form.Radio
                      {...input}
                      label={playStyle}
                      value={playStyle}
                    />
                  )}
                </FinalField>
              ))}
            </Form.Group>

            <Form.Group inline>
              <label>Difficulty</label>
              {_.map(Difficulty, difficulty => (
                <FinalField name="Difficulties">
                  {({ input }) => (
                    <Form.Checkbox
                      {...input}
                      label={difficulty}
                      value={difficulty}
                    />
                  )}
                </FinalField>
              ))}
            </Form.Group>

            <Form.Group inline>
              <label>Level</label>
              {_.range(1, 12 + 1).map(level => (
                <FinalField name="levels">
                  {({ input }) => (
                    <Form.Checkbox
                      {...input}
                      label={`☆${level}`}
                      value={level}
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
