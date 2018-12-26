import * as React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import * as renderer from 'react-test-renderer'

import Index from '@app/pages/index'
import {
  Difficulty,
  GetMusicsWithMapsDocument,
  GetMusicsWithMapsQuery,
  PlayStyle,
} from '@app/queries'

describe('/', () => {
  const data: GetMusicsWithMapsQuery = {
    musics: [
      {
        __typename: 'Music',
        id: '1',
        title: 'title',
        subTitle: 'subTitle',
        maps: [
          {
            __typename: 'Map',
            id: '1',
            difficulty: Difficulty.Another,
            level: 1,
            playStyle: PlayStyle.Sp,
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
        <Index />
      </MockedProvider>,
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
