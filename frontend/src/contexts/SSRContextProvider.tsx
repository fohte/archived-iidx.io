import * as React from 'react'

import SSRContext from '@app/contexts/SSRContext'

export interface Props {}

const SSRContextProvider: React.FC<Props> = props => {
  const [ssr, setSSR] = React.useState(true)

  React.useEffect(() => {
    setSSR(false)
  }, [])

  return <SSRContext.Provider value={ssr}>{props.children}</SSRContext.Provider>
}

export default SSRContextProvider
