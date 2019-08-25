import dayjs from 'dayjs'

import { findPreviousRefreshDateTime } from '@app/lib/dateTime'

describe('findPreviousRefreshDateTime', () => {
  it('6 時以降の場合は今日の 6 時を返す', () => {
    expect(findPreviousRefreshDateTime(dayjs('2019-08-25 14:55:00'))).toEqual(
      dayjs('2019-08-25 06:00:00'),
    )
  })

  it('6 時以前の場合は昨日の 6 時を返す', () => {
    expect(findPreviousRefreshDateTime(dayjs('2019-08-25 05:55:00'))).toEqual(
      dayjs('2019-08-24 06:00:00'),
    )
  })
})
