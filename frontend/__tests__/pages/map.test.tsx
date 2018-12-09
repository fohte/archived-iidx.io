import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Map from '@app/pages/map'
import { Difficulty, FindMapMusic, PlayStyle } from '@app/queries'

describe('/map', () => {
  it('renders correctly', () => {
    const music: FindMapMusic = {
      id: '1',
      title: 'title',
      subTitle: 'subTitle',
      genre: 'genre',
      artist: 'artist',
      textageUid: 'textageUid',
      series: 1,
      leggendaria: false,
      map: {
        id: '1',
        numNotes: 1000,
        level: 12,
        playStyle: PlayStyle.Sp,
        difficulty: Difficulty.Another,
        minBpm: 100,
        maxBpm: 400,
      },
    }

    const component = renderer.create(<Map music={music} loading={false} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when loading', () => {
    const component = renderer.create(<Map loading />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly if there are errors', () => {
    const component = renderer.create(
      <Map
        errors={[{ code: 'NOT_FOUND', message: 'not found' }]}
        loading={false}
      />,
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
