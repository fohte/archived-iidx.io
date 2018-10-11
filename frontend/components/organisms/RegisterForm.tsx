import { Button, Form, Icon, Input } from 'antd'
import { FormComponentProps, ValidationRule } from 'antd/lib/form'
import * as React from 'react'

import InputIcon from '@app/components/atoms/InputIcon'
import withSubmitHandling, {
  ComponentExternalProps,
  InjectedProps,
} from '@app/lib/withSubmitHandling'

export type ExternalProps = ComponentExternalProps<FormValues>

export interface Props
  extends ExternalProps,
    FormComponentProps,
    InjectedProps {}

export interface State {
  submitting: boolean
  errorMessage: string | null
}

export interface FormValues {
  username: string
  displayName: string
}

const Atmark = () => <span style={{ color: 'rgba(0, 0, 0, 0.25)' }}>@</span>

const fieldRules: { [key in keyof FormValues]: ValidationRule[] } = {
  username: [
    { required: true, message: 'Please input your username.' },
    {
      pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
      message:
        'Username may only contain alphanumeric characters or underscores, and cannot begin with a number.',
    },
    { max: 20, message: 'Username is too long (maximum is 20 characters).' },
  ],
  displayName: [
    {
      max: 40,
      message: 'Display Name is too long (maximum is 40 characters).',
    },
  ],
}

const RegisterForm: React.SFC<Props> = ({
  form: { getFieldDecorator },
  errorMessage,
  handleSubmit,
  submitting,
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Item>
      {getFieldDecorator('username', { rules: fieldRules.username })(
        <Input prefix={<Atmark />} placeholder="Username" />,
      )}
    </Form.Item>
    <Form.Item>
      {getFieldDecorator('displayName', { rules: fieldRules.displayName })(
        <Input prefix={<InputIcon type="user" />} placeholder="Display Name" />,
      )}
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        {submitting ? <Icon type="loading" /> : 'Sign up'}
      </Button>
      {errorMessage}
    </Form.Item>
  </Form>
)

const WrappedNormalRegisterForm = Form.create<ExternalProps>()(
  withSubmitHandling<FormValues>()(RegisterForm),
)

export default WrappedNormalRegisterForm
