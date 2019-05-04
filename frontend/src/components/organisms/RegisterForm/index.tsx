import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import { isEmpty, isLength, matches } from 'validator'

import Alert from '@app/components/atoms/Alert'
import Button from '@app/components/atoms/Button'
import FormGroup from '@app/components/atoms/FormGroup'
import InputText from '@app/components/atoms/InputText'
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
      <form onSubmit={innerHandleSubmit}>
        <FinalField name="username" validate={validators.username}>
          {({ input, meta }) => (
            <FormGroup
              label="Username"
              error={!!(meta.touched && meta.error)}
              errorMessage={meta.error}
            >
              <InputText
                {...input}
                error={!!(meta.touched && meta.error)}
                placeholder="Username"
              />
            </FormGroup>
          )}
        </FinalField>
        <FinalField name="displayName" validate={validators.displayName}>
          {({ input, meta }) => (
            <FormGroup
              label="Display Name"
              error={!!(meta.touched && meta.error)}
              errorMessage={meta.error}
            >
              <InputText
                {...input}
                error={!!(meta.touched && meta.error)}
                placeholder="Display Name"
              />
            </FormGroup>
          )}
        </FinalField>
        {hasSubmitErrors && <Alert>{submitError}</Alert>}
        <Button
          type="submit"
          disabled={submitting || pristine || hasValidationErrors}
          loading={submitting}
        >
          Register
        </Button>
      </form>
    )}
  </FinalForm>
)

const WrappedNormalRegisterForm = withSubmitHandling<FormValues>()(RegisterForm)

export default WrappedNormalRegisterForm
