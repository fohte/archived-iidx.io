import dayjs from 'dayjs'

import { findPreviousRefreshDateTime } from '@app/lib/dateTime'

describe('findPreviousRefreshDateTime', () => {
  it('6:00 (JST) 以降の場合は今日の 6:00 (JST) を返す', () => {
    const d = findPreviousRefreshDateTime(dayjs('2019-08-25T06:05:00+0900'))
    const want = dayjs('2019-08-24T21:00:00Z')

    expect(d.isSame(want)).toBeTruthy()
  })

  it('6:00 (JST) 以前の場合は昨日の 6:00 (JST) 時を返す', () => {
    const d = findPreviousRefreshDateTime(dayjs('2019-08-25T05:55:00+0900'))
    const want = dayjs('2019-08-23T21:00:00Z')

    expect(d.isSame(want)).toBeTruthy()
  })
})
