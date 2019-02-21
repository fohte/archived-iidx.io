import * as React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import * as renderer from 'react-test-renderer'

import ResultList from '@app/components/organisms/ResultList'
import { FormValues } from '@app/components/organisms/ResultSearchForm'
import {
  GetUserResultsDocument,
  GetUserResultsQuery,
  PlayStyle,
} from '@app/queries'

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

const screenName = 'username'

const initialValues: FormValues = {
  title: null,
  playStyle: PlayStyle.Sp,
  difficulties: [],
  levels: [],
}

const request = {
  query: GetUserResultsDocument,
  variables: {
    username: screenName,
    ...initialValues,
  },
}

describe('ResultList', () => {
  it('renders correctly', async () => {
    const data: GetUserResultsQuery = { searchMaps: [] }

    const mocks = [{ request, result: { data } }]

    const component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ResultList
          onSubmit={() => {
            /* NOP */
          }}
          screenName={screenName}
          initialValues={initialValues}
        />
      </MockedProvider>,
    )

    // wait for response of the query
    await wait(0)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when loading', async () => {
    const data: GetUserResultsQuery = { searchMaps: [] }

    const mocks = [{ request, result: { data } }]

    const component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ResultList
          onSubmit={() => {
            /* NOP */
          }}
          screenName={screenName}
          initialValues={initialValues}
        />
      </MockedProvider>,
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly if there are errors', async () => {
    const mocks = [{ request, error: new Error('something') }]

    const component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ResultList
          onSubmit={() => {
            /* NOP */
          }}
          screenName={screenName}
          initialValues={initialValues}
        />
      </MockedProvider>,
    )

    // wait for response of the query
    await wait(0)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})