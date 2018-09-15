import { FormComponentProps } from 'antd/lib/form'
import * as React from 'react'
import { setDisplayName, wrapDisplayName } from 'recompose'
import { Diff } from 'utility-types'

export interface FormInjectedProps {
  form: FormComponentProps['form']
}

export interface ComponentExternalProps<FormValues extends {}> {
  submitRequest?: (values: FormValues) => void
  onSubmitSuccess?: () => void
}

export interface ExternalProps<FormValues extends {}>
  extends ComponentExternalProps<FormValues>,
    FormInjectedProps {}

interface State {
  submitting: boolean
  errorMessage: string | null
}

export interface InjectedProps {
  submitting: boolean
  errorMessage: string | null
  handleSubmit: (e: React.FormEvent) => void
}

export default <FormValues extends {}>() => <OriginalProps extends {}>(
  WrappedComponent: React.ComponentType<OriginalProps & InjectedProps>,
) => {
  type EnhancedProps = Diff<OriginalProps, InjectedProps> &
    ExternalProps<FormValues>

  class WithSubmitHandling extends React.Component<EnhancedProps, State> {
    public state: Readonly<State> = {
      submitting: false,
      errorMessage: null,
    }

    public handleSubmit: InjectedProps['handleSubmit'] = e => {
      const { form, submitRequest, onSubmitSuccess } = this.props

      e.preventDefault()
      form.validateFields(async (err, values: FormValues) => {
        if (err) {
          return
        }

        if (submitRequest) {
          this.setState({ submitting: true })

          try {
            await submitRequest(values)

            if (onSubmitSuccess) {
              onSubmitSuccess()
            }

            this.setState({ submitting: false })
          } catch (e) {
            this.setState({ errorMessage: e.message, submitting: false })
          }
        }
      })
    }

    public render() {
      const { submitting, errorMessage } = this.state

      return (
        <WrappedComponent
          submitting={submitting}
          errorMessage={errorMessage}
          handleSubmit={this.handleSubmit}
          {...this.props}
        />
      )
    }
  }

  const newDisplayName = wrapDisplayName(WrappedComponent, 'withSubmitHandling')
  return setDisplayName<EnhancedProps>(newDisplayName)(WithSubmitHandling)
}
