import { Button, Form, Icon, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
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
  email: string
  password: string
}

const LoginForm: React.SFC<Props> = ({
  form: { getFieldDecorator },
  errorMessage,
  handleSubmit,
  submitting,
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Item>
      {getFieldDecorator('email', {
        rules: [{ required: true, message: 'Please input your email.' }],
      })(<Input prefix={<InputIcon type="mail" />} placeholder="Email" />)}
    </Form.Item>
    <Form.Item>
      {getFieldDecorator('password', {
        rules: [{ required: true, message: 'Please input your password.' }],
      })(
        <Input
          prefix={<InputIcon type="lock" />}
          type="password"
          placeholder="Password"
        />,
      )}
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        {submitting ? <Icon type="loading" /> : 'Log in'}
      </Button>
      {errorMessage}
    </Form.Item>
  </Form>
)

const WrappedNormalLoginForm = Form.create<ExternalProps>()(
  withSubmitHandling<FormValues>()(LoginForm),
)

export default WrappedNormalLoginForm
