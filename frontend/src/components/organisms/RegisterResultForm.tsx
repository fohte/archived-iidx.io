import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import { Button, Form, Label, TextArea } from 'semantic-ui-react'
import { isEmpty } from 'validator'

import { PlayStyle } from '@app/queries'

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

const RegisterResultForm = ({ onSubmit }: Props) => (
  <FinalForm onSubmit={onSubmit}>
    {({
      handleSubmit: innerHandleSubmit,
      pristine,
      submitting,
      touched,
      errors,
      hasValidationErrors,
    }) => (
      <Form onSubmit={innerHandleSubmit}>
        <Form.Group inline>
          <label>Play Style</label>
          {['SP', 'DP'].map(playStyle => (
            <FinalField
              key={playStyle}
              type="radio"
              name="playStyle"
              value={playStyle}
              validate={validators.playStyle}
            >
              {({ input, meta }) => (
                <Form.Radio
                  {...input}
                  label={playStyle}
                  onChange={(_, { value }) => {
                    input.onChange(value)
                  }}
                  error={!!(meta.touched && meta.error)}
                />
              )}
            </FinalField>
          ))}
          {touched && touched.playStyle && errors.playStyle && (
            <Label basic color="red" pointing>
              {errors.playStyle}
            </Label>
          )}
        </Form.Group>
        <FinalField
          name="csv"
          placeholder="Paste CSV here"
          validate={validators.csv}
        >
          {({ input, meta }) => (
            <Form.Field error={!!(meta.touched && meta.error)}>
              <label>CSV</label>
              <TextArea {...input} />
              {meta.touched && meta.error && (
                <Label basic color="red" pointing>
                  {meta.error}
                </Label>
              )}
            </Form.Field>
          )}
        </FinalField>
        <Button
          type="submit"
          disabled={submitting || pristine || hasValidationErrors}
          loading={submitting}
        >
          submit
        </Button>
      </Form>
    )}
  </FinalForm>
)

export default RegisterResultForm
