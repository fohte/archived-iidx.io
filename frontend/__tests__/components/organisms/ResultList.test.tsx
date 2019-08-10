import * as React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import * as renderer from 'react-test-renderer'

import { FormValues } from '@app/components/organisms/FilterForm'
import ResultList from '@app/components/organisms/ResultList'
import {
  GetUserResultsDocument,
  GetUserResultsQuery,
  PlayStyle,
} from '@app/queries'

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

const screenName = 'username'

const initialValues: FormValues = {
  title: null,
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
    const data: GetUserResultsQuery = {
      searchMaps: { totalCount: 0, nodes: [] },
    }

    const mocks = [{ request, result: { data } }]

    const component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ResultList
          screenName={screenName}
          formValues={initialValues}
          playStyle={PlayStyle.Sp}
          activePage={1}
        />
      </MockedProvider>,
    )

    await renderer.act(async () => {
      // wait for response of the query
      await wait(0)
    })

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  // FIXME: `An update to ResultList inside a test was not wrapped in act(...).`
  // という warning が出るが、どう修正するべきか分からないので一旦コメントアウトする
  // it('renders correctly when loading', () => {
  //   const data: GetUserResultsQuery = {
  //     searchMaps: { totalCount: 0, nodes: [] },
  //   }
  //
  //   const mocks = [{ request, result: { data } }]
  //
  //   const component = renderer.create(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <ResultList
  //         screenName={screenName}
  //         formValues={initialValues}
  //         playStyle={PlayStyle.Sp}
  //         activePage={1}
  //       />
  //     </MockedProvider>,
  //   )
  //
  //   const tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })

  it('renders correctly if there are errors', async () => {
    const mocks = [{ request, error: new Error('something') }]

    const component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ResultList
          screenName={screenName}
          formValues={initialValues}
          playStyle={PlayStyle.Sp}
          activePage={1}
        />
      </MockedProvider>,
    )

    await renderer.act(async () => {
      // wait for response of the query
      await wait(0)
    })

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
