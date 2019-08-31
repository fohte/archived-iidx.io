import React from 'react'
import dayjs from 'dayjs'

import CurrentDateTimeContext from '@app/contexts/CurrentDateTimeContext'

const useCurrentDateTimeContext = (): dayjs.Dayjs => {
  const { current } = React.useContext(CurrentDateTimeContext)
  const ref = React.useRef<dayjs.Dayjs>()

  const d = dayjs(current)

  if (!(ref.current && ref.current.isSame(d))) {
    ref.current = d
  }

  return ref.current
}

export default useCurrentDateTimeContext
