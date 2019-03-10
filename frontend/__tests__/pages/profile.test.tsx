import { GraphQLError } from 'graphql'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Profile from '@app/pages/profile'

describe('/', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <Profile
        user={{ __typename: 'User', name: 'username' }}
        loading={false}
      />,
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when loading', () => {
    const component = renderer.create(<Profile loading />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly if there are errors', () => {
    const errors: Readonly<[GraphQLError]> = [
      new GraphQLError(
        'not found',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { code: 'NOT_FOUND' },
      ),
    ]

    const component = renderer.create(
      <Profile errors={errors} loading={false} />,
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
