import classnames from 'classnames/bind'
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
  button?: boolean
}

const RadioButton: React.FunctionComponent<Props> = ({
  className,
  children,
  disabled,
  onChange,
  checked = false,
  button = false,
  ...otherProps
}) => {
  return (
    <label className={cx('label')}>
      <input
        className={cx('input')}
        onChange={onChange}
        type="radio"
        disabled={disabled}
        checked={checked}
        {...otherProps}
      />
      {button ? (
        <Button
          as="div"
          className={className}
          active={checked}
          disabled={disabled}
        >
          {children}
        </Button>
      ) : (
        <div className={cx('radio', { checked, disabled })}>{children}</div>
      )}
    </label>
  )
}

export default RadioButton
