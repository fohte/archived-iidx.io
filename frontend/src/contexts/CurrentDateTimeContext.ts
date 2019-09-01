import * as React from 'react'

export interface CurrentDateTimeContextShape {
  current: string
}

export const defaultValues: Readonly<CurrentDateTimeContextShape> = {
  current: new Date(Date.now()).toISOString(),
}

const CurrentDateTimeContext = React.createContext<CurrentDateTimeContextShape>(
  defaultValues,
)

export default CurrentDateTimeContext
