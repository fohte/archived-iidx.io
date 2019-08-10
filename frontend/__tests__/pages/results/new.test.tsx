import * as React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import * as renderer from 'react-test-renderer'

import ResultsNew from '@app/pages/results/new'
import {
  PlayStyle,
  RegisterResultsWithCsvDocument,
  RegisterResultsWithCsvMutationVariables,
} from '@app/queries'

describe('/', () => {
  const createMocks = (variables: RegisterResultsWithCsvMutationVariables) => [
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
        mocks={createMocks({ csv: 'csv', playStyle: PlayStyle.Sp })}
      >
        <ResultsNew />
      </MockedProvider>,
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
