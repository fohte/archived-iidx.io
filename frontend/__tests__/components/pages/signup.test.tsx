import { mount, ReactWrapper } from 'enzyme'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import { FormValues } from '@app/components/organisms/SignUpForm'
import { auth } from '@app/lib/firebaseApp'
import Signup from '@app/pages/signup'

const inputFields = (wrapper: ReactWrapper, values: FormValues) => {
  Object.keys(values).forEach(key => {
    const value = values[key]
    wrapper.find(`input#${key}`).simulate('change', { target: { value } })
  })
}

const submit = (wrapper: ReactWrapper) => {
  wrapper.find('button[type="submit"]').simulate('submit')
}

describe('/signup', () => {
  beforeEach(() => {
    auth.createUserWithEmailAndPassword = jest.fn()
  })

  it('create a user on firebase auth', () => {
    const wrapper = mount(<Signup />)

    inputFields(wrapper, { email: 'email', password: 'password' })
    submit(wrapper)

    expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      'email',
      'password',
    )
  })

  it('renders correctly', () => {
    const component = renderer.create(<Signup />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
