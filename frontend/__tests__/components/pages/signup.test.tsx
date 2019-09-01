import { mount, ReactWrapper } from 'enzyme'
import * as _ from 'lodash'
import { act } from 'react-dom/test-utils'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import { FormValues } from '@app/components/organisms/LoginOrSignUpForm'
import Signup from '@pages/signup'

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

  it('create a user on firebase auth', async () => {
    const wrapper = mount(<Signup />)

    // FIXME: react-dom の型定義が第一引数の Promise を許可していないので
    // any にしている。@types/react-dom@16.9.0 がリリースされたら any
    // キャストをやめる
    await act((async () => {
      inputFields(wrapper, { email: 'email@example.com', password: 'password' })
      submit(wrapper)
    }) as any)

    expect(mockCreate).toHaveBeenCalledWith('email@example.com', 'password')
  })

  it('renders correctly', () => {
    const component = renderer.create(<Signup />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
