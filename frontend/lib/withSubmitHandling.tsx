import { FORM_ERROR } from 'final-form'
import * as React from 'react'
import { FormProps } from 'react-final-form'
import { setDisplayName, wrapDisplayName } from 'recompose'
import { Diff } from 'utility-types'

export interface ComponentExternalProps<FormValues extends {}> {
  submitRequest?: (values: FormValues) => Promise<void>
  onSubmitSuccess?: () => void
}

export interface ExternalProps<FormValues extends {}>
  extends ComponentExternalProps<FormValues> {}

export interface InjectedProps {
  handleSubmit: FormProps['onSubmit']
}

export default <FormValues extends {}>() => <OriginalProps extends {}>(
  WrappedComponent: React.ComponentType<OriginalProps & InjectedProps>,
) => {
  type EnhancedProps = Diff<OriginalProps, InjectedProps> &
    ExternalProps<FormValues>

  class WithSubmitHandling extends React.Component<EnhancedProps> {
    public handleSubmit: InjectedProps['handleSubmit'] = async (
      values: FormValues,
    ) => {
      const { submitRequest, onSubmitSuccess } = this.props

      if (submitRequest) {
        try {
          await submitRequest(values)

          if (onSubmitSuccess) {
            onSubmitSuccess()
          }
        } catch (e) {
          return { [FORM_ERROR]: e.message }
        }
      }
    }

    public render() {
      return (
        <WrappedComponent handleSubmit={this.handleSubmit} {...this.props} />
      )
    }
  }

  const newDisplayName = wrapDisplayName(WrappedComponent, 'withSubmitHandling')
  return setDisplayName<EnhancedProps>(newDisplayName)(WithSubmitHandling)
}
