import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import { isEmail, isEmpty } from 'validator'

import Alert from '@app/components/atoms/Alert'
import Button from '@app/components/atoms/Button'
import FormGroup from '@app/components/atoms/FormGroup'
import InputText from '@app/components/atoms/InputText'
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
      <form onSubmit={innerHandleSubmit}>
        <FinalField name="email" validate={validators.email}>
          {({ input, meta }) => (
            <FormGroup
              label="E-mail address"
              error={!!(meta.touched && meta.error)}
              errorMessage={meta.error}
            >
              <InputText
                type="email"
                error={!!(meta.touched && meta.error)}
                {...input}
                placeholder="E-mail address"
              />
            </FormGroup>
          )}
        </FinalField>
        <FinalField name="password" validate={validators.password}>
          {({ input, meta }) => (
            <FormGroup
              label="Password"
              error={!!(meta.touched && meta.error)}
              errorMessage={meta.error}
            >
              <InputText
                type="password"
                error={!!(meta.touched && meta.error)}
                {...input}
                placeholder="Password"
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
          {submitText}
        </Button>
      </form>
    )}
  </FinalForm>
)

const WrappedNormalLoginOrSignUpForm = withSubmitHandling<FormValues>()(
  LoginOrSignUpForm,
)

export default WrappedNormalLoginOrSignUpForm
