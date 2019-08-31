import * as React from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export interface CurrentDateTimeContextShape {
  current: string
}

export const defaultValues: Readonly<CurrentDateTimeContextShape> = {
  current: dayjs()
    .utc()
    .toISOString(),
}

const CurrentDateTimeContext = React.createContext<CurrentDateTimeContextShape>(
  defaultValues,
)

export default CurrentDateTimeContext
