import dayjs from 'dayjs'

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
