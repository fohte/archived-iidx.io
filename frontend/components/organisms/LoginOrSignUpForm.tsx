import * as React from 'react'
import { Field, Form } from 'react-final-form'
import { Icon } from 'semantic-ui-react'
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
  <Form onSubmit={handleSubmit} initialValues={{ email: '', password: '' }}>
    {({
      handleSubmit: innerHandleSubmit,
      pristine,
      invalid,
      submitting,
      submitError,
    }) => (
      <form onSubmit={innerHandleSubmit}>
        <Field name="email" validate={validators.email}>
          {({ input, meta }) => (
            <div>
              <label>Email</label>
              <input type="email" {...input} placeholder="Email" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <Field name="password" validate={validators.password}>
          {({ input, meta }) => (
            <div>
              <label>Password</label>
              <input type="password" {...input} placeholder="Password" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <button type="submit" disabled={submitting || pristine || invalid}>
          {submitting ? <Icon loading name="spinner" /> : submitText}
        </button>
        {submitError && submitError}
      </form>
    )}
  </Form>
)

const WrappedNormalLoginOrSignUpForm = withSubmitHandling<FormValues>()(
  LoginOrSignUpForm,
)

export default WrappedNormalLoginOrSignUpForm
