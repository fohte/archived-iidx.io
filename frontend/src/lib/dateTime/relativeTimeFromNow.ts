import { Spacetime } from 'spacetime'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const relativeTimeFromNow = (d: Spacetime): string => dayjs(d.epoch).fromNow()

export default relativeTimeFromNow
