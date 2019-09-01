import spacetime from 'spacetime'

import { findPreviousRefreshDateTime } from '@app/lib/dateTime'

describe('findPreviousRefreshDateTime', () => {
  it('6:00 (JST) 以降の場合は今日の 6:00 (JST) を返す', () => {
    const d = findPreviousRefreshDateTime(spacetime('2019-08-25T06:05:00+0900'))
    const want = spacetime('2019-08-24T21:00:00Z')

    expect(d.format('iso-utc')).toEqual(want.format('iso-utc'))
  })

  it('6:00 (JST) 以前の場合は昨日の 6:00 (JST) 時を返す', () => {
    const d = findPreviousRefreshDateTime(spacetime('2019-08-25T05:55:00+0900'))
    const want = spacetime('2019-08-23T21:00:00Z')

    expect(d.format('iso-utc')).toEqual(want.format('iso-utc'))
  })
})
