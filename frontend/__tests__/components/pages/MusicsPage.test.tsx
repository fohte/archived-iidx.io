import * as React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import * as renderer from 'react-test-renderer'

import MusicsPage from '@app/components/pages/MusicsPage'
import {
  Difficulty,
  GetMusicsWithMapsDocument,
  GetMusicsWithMapsQuery,
  PlayStyle,
} from '@app/queries'

describe('MusicsPage', () => {
  const data: GetMusicsWithMapsQuery = {
    musics: [
      {
        id: '1',
        title: 'title',
        subTitle: 'subTitle',
        maps: [
          {
            id: '1',
            difficulty: Difficulty.ANOTHER,
            level: 1,
            playStyle: PlayStyle.SP,
          },
        ],
      },
    ],
  }

  const mocks = [
    { request: { query: GetMusicsWithMapsDocument }, result: { data } },
  ]

  it('renders correctly', () => {
    const component = renderer.create(
      <MockedProvider mocks={mocks}>
        <MusicsPage />
      </MockedProvider>,
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
