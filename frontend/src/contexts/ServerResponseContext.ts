import * as React from 'react'
import { NextContext } from 'next'

export type ServerResponseContextShape = NextContext['res']

const ServerResponseContext = React.createContext<ServerResponseContextShape>(
  undefined,
)

export default ServerResponseContext
