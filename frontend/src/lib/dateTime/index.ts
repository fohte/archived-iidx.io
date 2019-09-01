import spacetime, { Spacetime } from 'spacetime'

export const formatUnixTime = (
  item: string | number,
  formatString: string,
): string => spacetime(Number(item)).format(formatString) as string

export const formatISO8601 = (str: string, formatString: string): string =>
  formatUnixTime(Date.parse(str), formatString)

const dateFormat = 'yyyy/MM/dd'
const timeFormat = 'HH:mm'

export const formats = {
  date: dateFormat,
  time: timeFormat,
  dateTime: `${dateFormat} ${timeFormat}`,
}

export const ensureJST = (d: Spacetime): Spacetime =>
  d.timezone().name === 'Asia/Tokyo' ? d : d.goto('Asia/Tokyo')

// 6:00 (JST) を返す
export const findRefreshDateTime = (d: Spacetime): Spacetime =>
  ensureJST(d)
    .hour(6)
    .minute(0)
    .second(0)

export const findPreviousRefreshDateTime = (d: Spacetime): Spacetime => {
  const jst = ensureJST(d)
  const refresh = findRefreshDateTime(jst)

  return jst.isAfter(refresh)
    ? refresh
    : findRefreshDateTime(jst.subtract(1, 'day'))
}

export { default as relativeTimeFromNow } from './relativeTimeFromNow'
