import * as _ from 'lodash'
import * as React from 'react'
import classnames from 'classnames/bind'
import { useScroll } from 'react-use'

import Box from '@app/components/atoms/Box'
import BoxHeader from '@app/components/atoms/BoxHeader'
import UserProfileLayout from '@app/components/templates/UserProfileLayout'
import { PlayStyle, Grade } from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  screenName: string
  playStyle: PlayStyle
}

const grades = [..._.keys(Grade), 'NO PLAY']

// div は th が position: sticky のときに Safari (+ iOS WebView) で
// 表示が崩れてしまうのを防ぐため (なぜ div を挟めばうまく動くのかは不明)
const TableHeadColumn: React.FC = ({ children }) => (
  <th className={cx('table-head-column')}>
    <div>{children}</div>
  </th>
)

const StatsPage: React.FC<Props> = ({ screenName, playStyle }) => {
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
    <UserProfileLayout
      screenName={screenName}
      playStyle={playStyle}
      activeTab="stats"
    >
      <Box>
        <BoxHeader>Grades</BoxHeader>

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
                  {grades.map(grade => (
                    <th key={grade}>{grade.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {_.rangeRight(1, 13).map(x => (
                  <tr key={x}>
                    <TableHeadColumn>☆{x}</TableHeadColumn>

                    {grades.map(grade => (
                      <td key={grade}>0</td>
                    ))}
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <TableHeadColumn>Total</TableHeadColumn>

                  {grades.map(grade => (
                    <td key={grade}>0</td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </Box>
    </UserProfileLayout>
  )
}

export default StatsPage
