import * as React from 'react'

import { WithLoadingState } from '@app/lib/types'

export interface Props<T extends {}> {
  onLoading?: React.ReactNode
  data: WithLoadingState<T>
  children: (data: T) => React.ReactNode
}

function NoLoading<T extends {}>({ onLoading, data, children }: Props<T>) {
  if (data.loading) {
    return <>{onLoading}</>
  } else {
    const { loading, ...coreData } = data

    // 推論された型が T と一致しないので無理やり cast する
    return <>{children((coreData as any) as T)}</>
  }
}

export default NoLoading
