import * as _ from 'lodash'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import MapTitleHeader, { Props } from '@app/components/molecules/MapTitleHeader'
import { Difficulty, PlayStyle } from '@app/queries'

describe('MapTitleHeader', () => {
  const makeMusic = (music?: Partial<Props['music']>): Props['music'] => ({
    title: 'title',
    subTitle: 'subTitle',
    genre: 'genre',
    artist: 'artist',
    series: 1,
    textageUid: 'textageUid',
    ...music,
  })

  const makeMap = (map?: Partial<Props['map']>): Props['map'] => ({
    level: 12,
    playStyle: PlayStyle.Sp,
    difficulty: Difficulty.Another,
    minBpm: 100,
    maxBpm: 100,
    numNotes: 1000,
    ...map,
  })

  const cases = [
    { playStyle: PlayStyle.Sp, minBpm: 100, maxBpm: 100 },
    { playStyle: PlayStyle.Sp, minBpm: 100, maxBpm: 400 },
    { playStyle: PlayStyle.Dp, minBpm: 100, maxBpm: 100 },
    { playStyle: PlayStyle.Dp, minBpm: 100, maxBpm: 400 },
  ]

  cases.forEach(({ playStyle, minBpm, maxBpm }) => {
    it(`renders correctly when playStyle is ${playStyle} and BPM is ${minBpm}-${maxBpm}`, () => {
      const props: Props = {
        music: makeMusic(),
        map: makeMap({ playStyle, minBpm, maxBpm }),
      }

      const tree = renderer.create(<MapTitleHeader {...props} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
