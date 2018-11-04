import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import { Button, Form, Input, Label, Message } from 'semantic-ui-react'
import { isEmpty, isLength, matches } from 'validator'

import withSubmitHandling, {
  ComponentExternalProps,
  InjectedProps,
} from '@app/lib/withSubmitHandling'

export interface ExternalProps extends ComponentExternalProps<FormValues> {}

export interface Props extends ExternalProps, InjectedProps {}

export interface FormValues {
  username: string
  displayName: string
}

const validators: {
  [key in keyof FormValues]: (
    value: FormValues[key] | null,
    allValues: FormValues,
  ) => string | undefined
} = {
  username: (value, _) => {
    if (!value || isEmpty(value)) {
      return 'Please input your username.'
    }

    if (!matches(value, /^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
      return 'Username may only contain alphanumeric characters or underscores, and cannot begin with a number.'
    }

    if (!isLength(value, { max: 20 })) {
      return 'Username is too long (maximum is 20 characters).'
    }
  },
  displayName: (value, _) => {
    if (!value || isEmpty(value)) {
      return 'Please input your display name.'
    }

    if (!isLength(value, { max: 40 })) {
      return 'Display Name is too long (maximum is 40 characters).'
    }
  },
}

const RegisterForm: React.SFC<Props> = ({ handleSubmit }) => (
  <FinalForm
    onSubmit={handleSubmit}
    initialValues={{ username: '', displayName: '' }}
  >
    {({
      handleSubmit: innerHandleSubmit,
      pristine,
      submitting,
      submitError,
      hasSubmitErrors,
      hasValidationErrors,
    }) => (
      <Form onSubmit={innerHandleSubmit} error={hasSubmitErrors}>
        <FinalField name="username" validate={validators.username}>
          {({ input, meta }) => (
            <Form.Field error={!!(meta.touched && meta.error)}>
              <label>Username</label>
              <Input
                type="text"
                icon="at"
                iconPosition="left"
                {...input}
                placeholder="Username"
              />
              {meta.touched &&
                meta.error && (
                  <Label basic color="red" pointing>
                    {meta.error}
                  </Label>
                )}
            </Form.Field>
          )}
        </FinalField>
        <FinalField name="displayName" validate={validators.displayName}>
          {({ input, meta }) => (
            <Form.Field error={!!(meta.touched && meta.error)}>
              <label>Display Name</label>
              <Input
                type="text"
                icon="user"
                iconPosition="left"
                {...input}
                placeholder="Display Name"
              />
              {meta.touched &&
                meta.error && (
                  <Label basic color="red" pointing>
                    {meta.error}
                  </Label>
                )}
            </Form.Field>
          )}
        </FinalField>
        {hasSubmitErrors && <Message error content={submitError} />}
        <Button
          type="submit"
          disabled={submitting || pristine || hasValidationErrors}
          color="teal"
          size="large"
          loading={submitting}
        >
          Sign up
        </Button>
      </Form>
    )}
  </FinalForm>
)

const WrappedNormalRegisterForm = withSubmitHandling<FormValues>()(RegisterForm)

export default WrappedNormalRegisterForm
