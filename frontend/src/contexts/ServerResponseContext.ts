import * as React from 'react'
import { NextPageContext } from 'next'

export type ServerResponseContextShape = NextPageContext['res']

const ServerResponseContext = React.createContext<ServerResponseContextShape>(
  undefined,
)

export default ServerResponseContext
