import * as React from 'react'

import CurrentDateTimeContext, {
  defaultValues,
} from '@app/contexts/CurrentDateTimeContext'

interface Props {}

const CurrentDateTimeProvider: React.FC<Props> = props => {
  const [current] = React.useState(defaultValues)

  return (
    <CurrentDateTimeContext.Provider value={current}>
      {props.children}
    </CurrentDateTimeContext.Provider>
  )
}

export default CurrentDateTimeProvider
