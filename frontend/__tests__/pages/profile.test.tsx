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
    const component = renderer.create(
      <Profile
        errors={[{ code: 'NOT_FOUND', message: 'not found' }]}
        loading={false}
      />,
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
