import classnames from 'classnames/bind'
import * as _ from 'lodash'
import ErrorPage from 'next/error'
import * as React from 'react'

import Container from '@app/components/atoms/Container'
import Pagination from '@app/components/atoms/Pagination'
import ResultTable from '@app/components/molecules/ResultTable'
import { FormValues } from '@app/components/organisms/FilterForm'
import {
  useGetUserResultsQuery,
  GetUserResultsQueryVariables,
  GetUserResultsQueryResult,
  PlayStyle,
} from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  formValues: FormValues
  playStyle: PlayStyle
  screenName: string
  activePage: number
  numItemsPerPage?: number
  onPageChange?: (newActivePage: number) => void
}

function usePrevious<T>(value: T) {
  const ref = React.useRef<T>()
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const PaginationContainer: React.SFC<{
  pagination: React.ReactNode
  children: React.ReactNode
}> = ({ pagination, children }) => (
  <>
    <div className={cx('pagination', 'top')}>{pagination}</div>
    {children}
    <div className={cx('pagination', 'bottom')}>{pagination}</div>
  </>
)

const ResultList: React.SFC<Props> = ({
  formValues: { title, difficulties, levels },
  playStyle,
  screenName,
  onPageChange,
  numItemsPerPage = 20,
  activePage,
}) => {
  const containerElement = React.useRef<HTMLDivElement | null>(null)

  // ページ情報を除くクエリ変数を保持しておく
  const baseVariables: GetUserResultsQueryVariables = {
    username: screenName,
    title,
    playStyle,
    difficulties,
    levels,
    limit: numItemsPerPage,
  }

  const previousBaseVariables = usePrevious(baseVariables)

  const [cachedTotalPages, cacheTotalPages] = React.useState<number | null>(
    null,
  )

  // baseVariables が変化したときに totalPages をリセットする
  // (baseVariables が変化する = フィルター条件が変更されたとき)
  React.useEffect(() => {
    if (
      previousBaseVariables &&
      !_.isEqual(previousBaseVariables, baseVariables)
    ) {
      cacheTotalPages(null)
    }
  }, [baseVariables, previousBaseVariables])

  const offset = (activePage - 1) * numItemsPerPage

  const queryResult = useGetUserResultsQuery({
    variables: { ...baseVariables, offset },
  })

  const Content = ({ loading, error, data }: GetUserResultsQueryResult) => {
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

    if (loading) {
      return (
        <PaginationContainer
          pagination={
            cachedTotalPages && (
              <Pagination
                onPageChange={changePage}
                totalPages={cachedTotalPages}
                activePage={activePage}
              />
            )
          }
        >
          <ResultTable
            showBPI
            data={{ loading: true, numDummyMaps: numItemsPerPage }}
            screenName={screenName}
          />
        </PaginationContainer>
      )
    }

    if (error || !data) {
      return <ErrorPage statusCode={404} />
    }

    const { totalCount, nodes } = data.searchMaps

    const totalPages = Math.ceil(totalCount / numItemsPerPage)

    return (
      <PaginationContainer
        pagination={
          <Pagination
            onPageChange={newActivePage => {
              changePage(newActivePage)

              // ページが変わるだけのときは totalPages も変わらない
              // のでキャッシュしてローディング中に使う
              cacheTotalPages(totalPages)
            }}
            totalPages={totalPages}
            activePage={activePage}
          />
        }
      >
        <ResultTable
          showBPI
          data={{ loading: false, maps: nodes }}
          screenName={screenName}
        />
      </PaginationContainer>
    )
  }

  return (
    <Container>
      <div ref={containerElement} className={cx('result-list')}>
        <div className={cx('table-wrapper')}>
          <Content {...queryResult}></Content>
        </div>
      </div>
    </Container>
  )
}

export default ResultList
