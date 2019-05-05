import { mount, ReactWrapper } from 'enzyme'
import * as _ from 'lodash'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import { FormValues } from '@app/components/organisms/LoginOrSignUpForm'
import Signup from '@app/pages/signup'

const mockCreate = jest.fn()

jest.mock('@app/lib/firebaseApp', () => ({
  auth: jest.fn().mockImplementation(() => ({
    createUserWithEmailAndPassword: mockCreate,
  })),
}))

const inputFields = (wrapper: ReactWrapper, values: FormValues) => {
  _.forEach(values, (value, key) => {
    wrapper
      .find(`input[name="${key}"]`)
      .simulate('change', { target: { value } })
  })
}

const submit = (wrapper: ReactWrapper) => {
  wrapper.find('button[type="submit"]').simulate('submit')
}

describe('/signup', () => {
  beforeEach(() => {
    mockCreate.mockClear()
  })

  it('create a user on firebase auth', () => {
    const wrapper = mount(<Signup />)

    inputFields(wrapper, { email: 'email@example.com', password: 'password' })
    submit(wrapper)

    expect(mockCreate).toHaveBeenCalledWith('email@example.com', 'password')
  })

  it('renders correctly', () => {
    const component = renderer.create(<Signup />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
