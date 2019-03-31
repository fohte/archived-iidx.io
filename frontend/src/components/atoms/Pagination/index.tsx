import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import * as React from 'react'

import * as css from './style.scss'

const cx = classnames.bind(css)

export type Props = {
  totalPages: number
  activePage: number
  onPageChange?: (newActivePage: number) => void
}

const Pagination: React.SFC<Props> = ({
  onPageChange,
  activePage,
  totalPages,
}) => {
  const changePage = (newActivePage: number) => {
    if (onPageChange) {
      onPageChange(newActivePage)
    }
  }

  const isFirstPage = activePage <= 1
  const isLastPage = activePage >= totalPages

  const jumpToFirst = () => {
    if (isFirstPage) {
      return
    }

    changePage(1)
  }

  const back = () => {
    if (isFirstPage) {
      return
    }

    changePage(activePage - 1)
  }

  const forward = () => {
    if (isLastPage) {
      return
    }

    changePage(activePage + 1)
  }

  const jumpToLast = () => {
    if (isLastPage) {
      return
    }

    changePage(totalPages)
  }

  return (
    <div className={cx('pagination')}>
      <a
        rel="nofollow"
        className={cx('jump-to-first', { disabled: isFirstPage })}
        onClick={jumpToFirst}
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </a>
      <a
        rel="nofollow"
        className={cx('back', { disabled: isFirstPage })}
        onClick={back}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </a>
      <span className={cx('page-info')}>
        Page <span className={cx('active-page')}>{activePage}</span> of{' '}
        {totalPages}
      </span>
      <a
        rel="nofollow"
        className={cx('forward', { disabled: isLastPage })}
        onClick={forward}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </a>
      <a
        rel="nofollow"
        className={cx('jump-to-last', { disabled: isLastPage })}
        onClick={jumpToLast}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </a>
    </div>
  )
}

export default Pagination
