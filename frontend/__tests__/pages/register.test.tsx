import * as React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import * as renderer from 'react-test-renderer'

import Register from '@pages/register'
import { RegisterDocument, RegisterMutation } from '@app/queries'

describe('/register', () => {
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
        <Register />
      </MockedProvider>,
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
