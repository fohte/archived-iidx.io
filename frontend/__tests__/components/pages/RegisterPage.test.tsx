import * as React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import * as renderer from 'react-test-renderer'

import RegisterPage from '@app/components/pages/RegisterPage'
import { RegisterDocument, RegisterMutation } from '@app/queries'

describe('RegisterPage', () => {
  const data: RegisterMutation = {
    createUser: {
      user: {
        name: 'name',
        profile: {
          displayName: 'displayName',
        },
      },
    },
  }

  const mocks = [{ request: { query: RegisterDocument }, result: { data } }]

  it('renders correctly', () => {
    const component = renderer.create(
      <MockedProvider mocks={mocks}>
        <RegisterPage />
      </MockedProvider>,
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
