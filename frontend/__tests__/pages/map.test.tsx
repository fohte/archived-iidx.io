import dayjs from 'dayjs'
import { GraphQLError } from 'graphql'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Map from '@app/pages/map'
import {
  ClearLamp,
  Difficulty,
  FindMapQuery,
  Grade,
  PlayStyle,
} from '@app/queries'

describe('/map', () => {
  it('renders correctly', () => {
    const lastPlayedAt = dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
    const music: FindMapQuery['music'] = {
      id: '1',
      title: 'title',
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
        result: {
          id: '1',
          score: 2000,
          missCount: 1,
          clearLamp: ClearLamp.FullCombo,
          gradeDiff: { grade: Grade.Aaa },
          nearestGradeDiff: { grade: Grade.Max, diff: -100 },
          bpi: 10,
          lastPlayedAt,
        },
        results: [
          {
            id: '1',
            score: 2000,
            lastPlayedAt,
          },
        ],
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
    const errors: Readonly<[GraphQLError]> = [
      new GraphQLError(
        'not found',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { code: 'NOT_FOUND' },
      ),
    ]

    const component = renderer.create(<Map errors={errors} loading={false} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
