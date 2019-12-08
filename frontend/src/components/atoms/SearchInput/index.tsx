import classnames from 'classnames/bind'
import * as React from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props extends React.HTMLProps<HTMLInputElement> {
  className?: string
}

const SearchInput: React.FunctionComponent<Props> = ({
  className,
  ...otherProps
}) => (
  <div className={[cx('search-box'), className].join(' ')}>
    <span className={cx('search-icon')}>
      <FontAwesomeIcon icon={faSearch} />
    </span>
    <input
      placeholder="Search"
      className={cx('input-text')}
      type="text"
      {...otherProps}
    />
  </div>
)

export default SearchInput
