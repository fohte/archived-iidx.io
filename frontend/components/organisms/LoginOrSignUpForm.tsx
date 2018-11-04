import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import {
  Button,
  Form,
  Icon,
  Input,
  Label,
  Message,
  Segment,
} from 'semantic-ui-react'
import { isEmail, isEmpty } from 'validator'

import withSubmitHandling, {
  ComponentExternalProps,
  InjectedProps,
} from '@app/lib/withSubmitHandling'

export interface ExternalProps extends ComponentExternalProps<FormValues> {
  submitText: string
}

export interface Props extends ExternalProps, InjectedProps {}

export interface FormValues {
  email: string
  password: string
}

const validators: {
  [key in keyof FormValues]: (
    value: FormValues[key] | null,
    allValues: FormValues,
  ) => string | undefined
} = {
  email: (value, _) => {
    if (!value || isEmpty(value)) {
      return 'Please input your email.'
    }

    if (!isEmail(value)) {
      return 'Email is invalid.'
    }
  },
  password: (value, _) => {
    if (!value || isEmpty(value)) {
      return 'Please input your password.'
    }
  },
}

const LoginOrSignUpForm: React.SFC<Props> = ({ handleSubmit, submitText }) => (
  <FinalForm
    onSubmit={handleSubmit}
    initialValues={{ email: '', password: '' }}
  >
    {({
      handleSubmit: innerHandleSubmit,
      pristine,
      hasValidationErrors,
      hasSubmitErrors,
      submitting,
      submitError,
    }) => (
      <Form size="large" onSubmit={innerHandleSubmit} error={hasSubmitErrors}>
        <Segment stacked textAlign="left">
          <FinalField name="email" validate={validators.email}>
            {({ input, meta }) => (
              <Form.Field error={!!(meta.touched && meta.error)}>
                <Input
                  fluid
                  type="email"
                  icon="user"
                  iconPosition="left"
                  {...input}
                  placeholder="E-mail address"
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
          <FinalField name="password" validate={validators.password}>
            {({ input, meta }) => (
              <Form.Field error={!!(meta.touched && meta.error)}>
                <Input
                  fluid
                  type="password"
                  icon="lock"
                  iconPosition="left"
                  {...input}
                  placeholder="Password"
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
            fluid
            size="large"
          >
            {submitting ? <Icon loading name="spinner" /> : submitText}
          </Button>
        </Segment>
      </Form>
    )}
  </FinalForm>
)

const WrappedNormalLoginOrSignUpForm = withSubmitHandling<FormValues>()(
  LoginOrSignUpForm,
)

export default WrappedNormalLoginOrSignUpForm
