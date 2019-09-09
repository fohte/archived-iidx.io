import * as _ from 'lodash'
import * as React from 'react'
import classnames from 'classnames/bind'
import { useScroll } from 'react-use'

import routes from '@server/routes'

import * as css from './style.scss'

const cx = classnames.bind(css)

const { Link } = routes

export interface MatrixData {
  value: number
  link?: string
}

export interface Props {
  data: MatrixData[][]
  rowHeaders: string[]
  columnHeaders: string[]
}

// div は th が position: sticky のときに Safari (+ iOS WebView) で
// 表示が崩れてしまうのを防ぐため (なぜ div を挟めばうまく動くのかは不明)
const TableHeadColumn: React.FC = ({ children }) => (
  <th className={cx('table-head-column', 'table-cell')}>
    <div>{children}</div>
  </th>
)

function MatrixTable({ data, rowHeaders, columnHeaders }: Props) {
  // const MatrixTable: React.FC<Props> = ({ data }) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const { x } = useScroll(ref)

  // 初期描画時に shadow が一瞬表示されてしまわないように
  // デフォルト値は true にする
  const [isScrollLeft, setScrollLeft] = React.useState(true)
  const [isScrollRight, setScrollRight] = React.useState(true)

  React.useEffect(() => {
    if (ref.current) {
      const { scrollWidth, scrollLeft, clientWidth } = ref.current
      const scrollRight = scrollWidth - clientWidth - scrollLeft

      // 左端からのスクロール値が 5px 以下なら左端であるとみなす
      const currentScrollLeftState = scrollLeft <= 5
      if (isScrollLeft !== currentScrollLeftState) {
        setScrollLeft(currentScrollLeftState)
      }

      // 右端からのスクロール値が 5px 以下なら右端であるとみなす
      // scrollRight は解像度が 100% でないモニターで 0 にならないバグがあるので注意
      // @see https://stackoverflow.com/questions/52470549/subpixel-scroll-issue-cant-set-scrolltop-properly-on-chrome-69
      const currentScrollRightState = scrollRight <= 5
      if (isScrollRight !== currentScrollRightState) {
        setScrollRight(currentScrollRightState)
      }
    }
  }, [isScrollLeft, isScrollRight, x])

  return (
    <div
      className={cx('table-shadow', {
        'left-shadow': !isScrollLeft,
        'right-shadow': !isScrollRight,
      })}
    >
      <div ref={ref} className={cx('table-wrapper')}>
        <table className={cx('table')}>
          <thead>
            <tr>
              <TableHeadColumn />
              {rowHeaders.map(rowHeader => (
                <th key={rowHeader} className={cx('table-cell')}>
                  {rowHeader}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {columnHeaders.map((columnHeader, y) => {
              const rowData = data[y]

              return (
                <tr key={columnHeader}>
                  <TableHeadColumn>{columnHeader}</TableHeadColumn>

                  {rowData != null &&
                    rowData.map((d, x) => {
                      const rowHeader = rowHeaders[x]
                      return d.link != null ? (
                        <td key={rowHeader}>
                          <Link route={d.link}>
                            <a className={cx('table-cell')}>{d.value}</a>
                          </Link>
                        </td>
                      ) : (
                        <td key={rowHeader} className={cx('table-cell')}>
                          {d.value}
                        </td>
                      )
                    })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MatrixTable
