import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FunctionComponent<Props> = ({
  className,
  children,
  disabled,
  onChange,
  checked = false,
  ...otherProps
}) => {
  return (
    <label className={cx('label')}>
      <input
        className={cx('input')}
        onChange={onChange}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        {...otherProps}
      />
      <div className={cx('checkbox', { checked, disabled })}>{children}</div>
    </label>
  )
}

export default Checkbox
