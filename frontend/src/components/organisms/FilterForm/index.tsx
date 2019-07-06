import * as classnames from 'classnames/bind'
import * as React from 'react'

import Button from '@app/components/atoms/Button'
import Container from '@app/components/atoms/Container'

import * as css from './style.scss'

const cx = classnames.bind(css)

export type Props = {
  onCloseRequested: () => void
}

const FilterForm: React.SFC<Props> = ({ onCloseRequested }) => {
  // このコンポーネントが開いている間は背景のスクロールを無効化する
  React.useEffect(() => {
    const { top, position } = document.body.style

    // `documentElement` は古いブラウザで未サポートなので `body` に fallback する
    // @see https://ginpen.com/2017/10/06/chrome-61-scrolltop/
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop

    // position を変更すると背景が最上部までスクロールされるので
    // 擬似的に背景位置を固定する
    document.body.style.top = `-${scrollTop}px`

    document.body.style.position = 'fixed'

    return () => {
      document.body.style.top = top
      document.body.style.position = position

      // position を変更すると背景が最上部までスクロールされるので
      // スクロール位置をコンポーネント表示前のスクロール位置に戻す
      document.documentElement.scrollTop = document.body.scrollTop = scrollTop
    }
  })

  return (
    <div className={cx('modal', 'filter-form')}>
      <Container>
        <Button
          color="black"
          expand={false}
          inverted
          onClick={() => {
            onCloseRequested()
          }}
        >
          Cancel
        </Button>
      </Container>
    </div>
  )
}

export default FilterForm
