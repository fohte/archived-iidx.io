import * as classnames from 'classnames/bind'
import * as _ from 'lodash'
import ErrorPage from 'next/error'
import * as React from 'react'

import Container from '@app/components/atoms/Container'
import Pagination from '@app/components/atoms/Pagination'
import ResultTable, {
  Props as ResultTableProps,
} from '@app/components/molecules/ResultTable'
import { FormValues } from '@app/components/organisms/FilterForm'
import { GetUserResultsComponent, PlayStyle } from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)

export type Props = {
  formValues: FormValues
  playStyle: PlayStyle
  screenName: string
  activePage: number
  numItemsPerPage?: number
  onPageChange?: ResultTableProps['onPageChange']
}

const ResultList: React.SFC<Props> = ({
  formValues: { title, difficulties, levels },
  playStyle,
  screenName,
  onPageChange,
  numItemsPerPage = 20,
  activePage,
}) => {
  const containerElement = React.useRef<HTMLDivElement | null>(null)

  const changePage = (newActivePage: number) => {
    if (onPageChange) {
      onPageChange(newActivePage)
    }

    if (containerElement && containerElement.current) {
      const offsetTop = containerElement.current.offsetTop

      if (window.scrollY > offsetTop) {
        window.scrollTo({ top: offsetTop })
      }
    }
  }

  const offset = (activePage - 1) * numItemsPerPage

  return (
    <Container>
      <div ref={containerElement} className={cx('result-list')}>
        <div className={cx('table-wrapper')}>
          <GetUserResultsComponent
            variables={{
              username: screenName,
              title,
              playStyle,
              difficulties,
              levels,
              limit: numItemsPerPage,
              offset,
            }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return 'loading'
              }
              if (error || !data) {
                return <ErrorPage statusCode={404} />
              }

              const { totalCount, nodes } = data.searchMaps

              const totalPages = Math.ceil(totalCount / numItemsPerPage)

              const pagination = (
                <Pagination
                  onPageChange={changePage}
                  totalPages={totalPages}
                  activePage={activePage}
                />
              )

              return (
                <>
                  <div className={cx('pagination', 'top')}>{pagination}</div>
                  <ResultTable showBPI maps={nodes} screenName={screenName} />
                  <div className={cx('pagination', 'bottom')}>{pagination}</div>
                </>
              )
            }}
          </GetUserResultsComponent>
        </div>
      </div>
    </Container>
  )
}

export default ResultList
