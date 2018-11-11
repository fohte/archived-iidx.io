import * as React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import * as renderer from 'react-test-renderer'

import ResultsNew from '@app/pages/results/new'
import {
  PlayStyle,
  RegisterResultsWithCsvDocument,
  RegisterResultsWithCsvVariables,
} from '@app/queries'

describe('/', () => {
  const createMocks = (variables: RegisterResultsWithCsvVariables) => [
    {
      request: {
        query: RegisterResultsWithCsvDocument,
        variables,
      },
      result: { data: { success: true } },
    },
  ]

  it('renders correctly', () => {
    const component = renderer.create(
      <MockedProvider
        mocks={createMocks({ csv: 'csv', playStyle: PlayStyle.SP })}
      >
        <ResultsNew />
      </MockedProvider>,
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
