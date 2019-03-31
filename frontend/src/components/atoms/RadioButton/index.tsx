import * as classnames from 'classnames/bind'
import * as React from 'react'

import Button from '@app/components/atoms/Button'
import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: React.FunctionComponent<Props> = ({
  className,
  children,
  disabled,
  onChange,
  checked = false,
  ...otherProps
}) => {
  return (
    <label>
      <input
        className={cx('input')}
        onChange={onChange}
        type="radio"
        disabled={disabled}
        checked={checked}
        {...otherProps}
      />
      <Button
        as="div"
        className={className}
        active={checked}
        disabled={disabled}
      >
        {children}
      </Button>
    </label>
  )
}

export default RadioButton
