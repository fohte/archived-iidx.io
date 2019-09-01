import { MockedProvider } from '@apollo/react-testing'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import spacetime from 'spacetime'

import CurrentDateTimeProvider from '@app/contexts/CurrentDateTimeProvider'
import CurrentDateTimeContext, {
  CurrentDateTimeContextShape,
} from '@app/contexts/CurrentDateTimeContext'
import Map, { NormalProps } from '@pages/map'
import { toQueryVariables } from '@app/components/pages/MapPage'
import {
  ClearLamp,
  Difficulty,
  FindMapQuery,
  Grade,
  PlayStyle,
  FindMapDocument,
} from '@app/queries'

// https://github.com/recharts/recharts/issues/765#issuecomment-315987356
const createNodeMock = () => {
  const doc = document.implementation.createHTMLDocument()
  return { parentElement: doc.body }
}

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

const baseProps: NormalProps = {
  musicNumber: 1,
  playStyle: PlayStyle.Sp,
  difficulty: Difficulty.Another,
  screenName: 'user',
}

const createRequest = (context: CurrentDateTimeContextShape) => ({
  query: FindMapDocument,
  variables: toQueryVariables(baseProps, spacetime(context.current)),
})

const createMock = (context: CurrentDateTimeContextShape) => {
  const lastPlayedAt = spacetime(context.current).format('iso-utc')
  const music: FindMapQuery = {
    music: {
      id: '1',
      number: 1,
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
          id: 'Result',
          score: 2000,
          scoreRate: 1.0,
          missCount: 1,
          clearLamp: ClearLamp.FullCombo,
          gradeDiff: { grade: Grade.Aaa },
          nearestGradeDiff: { grade: Grade.Max, diff: -100 },
          bpi: 10,
          lastPlayedAt,
        },
        oldResult: {
          id: 'OldResult',
          score: 1999,
          scoreRate: 1999 / 2000,
          missCount: 2,
          clearLamp: ClearLamp.ExHard,
          bpi: 9,
          lastPlayedAt,
        },
        results: [
          {
            id: 'ResultLog',
            score: 2000,
            scoreRate: 1.0,
            lastPlayedAt,
          },
        ],
      },
    },
  }

  return [{ request: createRequest(context), result: { data: music } }]
}

describe('/map', () => {
  it('renders correctly', async () => {
    const component = renderer.create(
      <CurrentDateTimeProvider>
        <CurrentDateTimeContext.Consumer>
          {context => (
            <MockedProvider mocks={createMock(context)} addTypename={false}>
              <Map error={false} {...baseProps} />
            </MockedProvider>
          )}
        </CurrentDateTimeContext.Consumer>
      </CurrentDateTimeProvider>,
      { createNodeMock },
    )

    await renderer.act(async () => {
      // wait for response of the query
      await wait(0)
    })

    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when loading', () => {
    const component = renderer.create(
      <CurrentDateTimeProvider>
        <CurrentDateTimeContext.Consumer>
          {context => (
            <MockedProvider mocks={createMock(context)} addTypename={false}>
              <Map error={false} {...baseProps} />
            </MockedProvider>
          )}
        </CurrentDateTimeContext.Consumer>
      </CurrentDateTimeProvider>,
      { createNodeMock },
    )

    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly if there are errors', () => {
    const component = renderer.create(<Map error />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
