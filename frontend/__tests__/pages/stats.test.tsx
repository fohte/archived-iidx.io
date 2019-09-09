import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { GraphQLError } from 'graphql'
import * as React from 'react'
import { mount } from 'enzyme'
import * as TestUtils from 'react-dom/test-utils'

import Stats, { Props } from '@pages/stats'
import {
  PlayStyle,
  FetchStatsQuery,
  FetchStatsDocument,
  FetchStatsQueryVariables,
} from '@app/queries'

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

function act<T>(callback: () => T): T {
  let ret: T

  TestUtils.act(() => {
    ret = callback()
  })

  // @ts-ignore "Variable is used before being assigned" エラーを無視する
  // TestUtils.act で ret 変数には確実に値が代入されているため
  return ret
}

const baseProps: Required<Props> = {
  playStyle: PlayStyle.Sp,
  screenName: 'user',
}

type User = NonNullable<FetchStatsQuery['user']>
type LevelGradeMatrix = User['countByEachLevelAndGrade']

const createRequest = () => {
  const variables: FetchStatsQueryVariables = {
    playStyle: baseProps.playStyle,
    username: baseProps.screenName,
  }

  return {
    query: FetchStatsDocument,
    variables,
  }
}

const createMock = (levelGradeMatrix: LevelGradeMatrix): MockedResponse[] => {
  const request = createRequest()

  const data: FetchStatsQuery = {
    user: {
      countByEachLevelAndGrade: levelGradeMatrix,
    },
  }

  return [{ request, result: { data } }]
}

describe('/map', () => {
  it('renders correctly', async () => {
    const wrapper = act(() =>
      mount(
        <MockedProvider mocks={createMock([])} addTypename={false}>
          <Stats {...baseProps} />
        </MockedProvider>,
      ),
    )

    await TestUtils.act(async () => {
      // wait for response of the query
      await wait(0)
    })

    expect(wrapper.getDOMNode()).toMatchSnapshot()
  })

  it('renders correctly when loading', () => {
    const wrapper = mount(
      <MockedProvider mocks={createMock([])} addTypename={false}>
        <Stats {...baseProps} />
      </MockedProvider>,
    )

    expect(wrapper.getDOMNode()).toMatchSnapshot()
  })

  it('renders correctly if there are no required arguments', () => {
    const wrapper = mount(<Stats />)

    expect(wrapper.getDOMNode()).toMatchSnapshot()
  })

  it('renders correctly if there are graphql errors', async () => {
    const mocks: MockedResponse[] = [
      {
        request: createRequest(),
        result: { errors: [new GraphQLError('some error')] },
      },
    ]

    const wrapper = act(() =>
      mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Stats {...baseProps} />
        </MockedProvider>,
      ),
    )

    await TestUtils.act(async () => {
      // wait for response of the query
      await wait(0)
    })

    expect(wrapper.getDOMNode()).toMatchSnapshot()
  })
})
