import * as React from 'react'
import { Field, Form } from 'react-final-form'
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
  <Form
    onSubmit={handleSubmit}
    initialValues={{ username: '', displayName: '' }}
  >
    {({
      handleSubmit: innerHandleSubmit,
      pristine,
      invalid,
      submitting,
      submitError,
    }) => (
      <form onSubmit={innerHandleSubmit}>
        <Field name="username" validate={validators.username}>
          {({ input, meta }) => (
            <div>
              <label>Username</label>
              <input type="text" {...input} placeholder="Username" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <Field name="displayName" validate={validators.displayName}>
          {({ input, meta }) => (
            <div>
              <label>Display Name</label>
              <input type="text" {...input} placeholder="Display Name" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <button type="submit" disabled={submitting || pristine || invalid}>
          {submitting ? 'submitting...' : 'Sign up'}
        </button>
        {submitError && submitError}
      </form>
    )}
  </Form>
)

const WrappedNormalRegisterForm = withSubmitHandling<FormValues>()(RegisterForm)

export default WrappedNormalRegisterForm
