import * as React from 'react'
import { NextPageContext } from 'next'

import ServerResponseContext from '@app/contexts/ServerResponseContext'
import isBrowser from '@app/lib/isBrowser'

export type ServerResponse = NonNullable<NextPageContext['res']> | null

export type SetResponseAction = (response: NonNullable<ServerResponse>) => void

export interface ServerResponseHook {
  response: ServerResponse
  setResponse: (action: SetResponseAction) => void
  setStatus: (statusCode: number) => void
}

const useServerResponse = (): ServerResponseHook => {
  const response = React.useContext(ServerResponseContext)

  if (isBrowser || response == null) {
    const responseFunction = () => {}

    return {
      response: null,
      setResponse: responseFunction,
      setStatus: responseFunction,
    }
  }

  return {
    response,
    setResponse: action => {
      action(response)
    },
    setStatus: statusCode => {
      response.statusCode = statusCode
    },
  }
}

export default useServerResponse
