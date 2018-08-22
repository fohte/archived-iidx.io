import { Button, Form, Icon, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import * as React from 'react'
import styled from 'styled-components'

export interface ExternalProps {
  submitRequest?: (values: FormValues) => void
}

export interface Props extends ExternalProps, FormComponentProps {}

export interface State {
  submitting: boolean
  errorMessage: string | null
}

export interface FormValues {
  email: string
  password: string
}

class LoginForm extends React.Component<Props, State> {
  public state: Readonly<State> = {
    submitting: false,
    errorMessage: null,
  }

  public handleSubmit = (e: React.FormEvent): void => {
    const { form, submitRequest } = this.props

    e.preventDefault()
    form.validateFields(async (err, values: FormValues) => {
      if (!err) {
        if (submitRequest) {
          this.setState({ submitting: true })

          try {
            await submitRequest(values)
            this.setState({ submitting: false })
          } catch (e) {
            this.setState({ errorMessage: e.message, submitting: false })
          }
        }
      }
    })
  }

  public render() {
    const {
      form: { getFieldDecorator },
    } = this.props

    const { submitting, errorMessage } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
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
  }
}

const InputIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`

const WrappedNormalLoginForm = Form.create<ExternalProps>()(LoginForm)

export default WrappedNormalLoginForm
