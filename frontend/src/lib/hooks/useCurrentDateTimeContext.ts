import React from 'react'
import spacetime, { Spacetime } from 'spacetime'

import CurrentDateTimeContext from '@app/contexts/CurrentDateTimeContext'

const useCurrentDateTimeContext = (): Spacetime => {
  const { current } = React.useContext(CurrentDateTimeContext)
  const ref = React.useRef<Spacetime>()

  const d = spacetime(current)

  if (!(ref.current && ref.current.isEqual(d))) {
    ref.current = d
  }

  return ref.current
}

export default useCurrentDateTimeContext
