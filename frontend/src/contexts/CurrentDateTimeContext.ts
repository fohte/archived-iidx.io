import * as React from 'react'
import dayjs from 'dayjs'

export interface CurrentDateTimeContextShape {
  current: dayjs.Dayjs
}

export const defaultValues: Readonly<CurrentDateTimeContextShape> = {
  current: dayjs(),
}

const CurrentDateTimeContext = React.createContext<CurrentDateTimeContextShape>(
  defaultValues,
)

export default CurrentDateTimeContext
