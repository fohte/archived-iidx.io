import * as classnames from 'classnames/bind'
import * as React from 'react'

import ErrorMessage from '@app/components/atoms/ErrorMessage'
import FormLabel from '@app/components/atoms/FormLabel'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  error?: boolean
  errorMessage?: string
  label: string
  children?: React.ReactNode
}

const FormGroup: React.FunctionComponent<Props> = ({
  error = false,
  errorMessage,
  label,
  children,
}) => (
  <div className={cx('form-group')}>
    <FormLabel>{label}</FormLabel>

    <div className={cx('input-area')}>{children}</div>

    {error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </div>
)

export default FormGroup
