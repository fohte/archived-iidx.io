import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const formatUnixTime = (
  item: string | number,
  formatString: string,
): string => dayjs.unix(Number(item)).format(formatString)

export const formatISO8601 = (str: string, formatString: string): string =>
  formatUnixTime(dayjs(str).unix(), formatString)

const dateFormat = 'YYYY/MM/DD'
const timeFormat = 'HH:mm'

export const formats = {
  date: dateFormat,
  time: timeFormat,
  dateTime: `${dateFormat} ${timeFormat}`,
}

export const findRefreshDateTime = (d: dayjs.Dayjs): dayjs.Dayjs =>
  d
    .local()
    .hour(6)
    .minute(0)
    .second(0)

export const findPreviousRefreshDateTime = (d: dayjs.Dayjs): dayjs.Dayjs => {
  const local = d.local()
  const refresh = findRefreshDateTime(local)

  return local.isAfter(refresh)
    ? refresh
    : findRefreshDateTime(local.subtract(1, 'day'))
}
