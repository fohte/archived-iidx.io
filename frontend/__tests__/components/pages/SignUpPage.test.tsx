import { mount, ReactWrapper } from 'enzyme'
import * as React from 'react'

import { FormValues } from '@app/components/organisms/SignUpForm'
import SignUpPage from '@app/components/pages/SignUpPage'
import { auth } from '@app/lib/firebaseApp'

const inputFields = (wrapper: ReactWrapper, values: FormValues) => {
  Object.keys(values).forEach(key => {
    const value = values[key]
    wrapper.find(`input#${key}`).simulate('change', { target: { value } })
  })
}

const submit = (wrapper: ReactWrapper) => {
  wrapper.find('button[type="submit"]').simulate('submit')
}

describe('SignUpPage', () => {
  beforeEach(() => {
    auth.createUserWithEmailAndPassword = jest.fn()
  })

  it('create a user on firebase auth', () => {
    const wrapper = mount(<SignUpPage />)

    inputFields(wrapper, {
      username: 'user',
      email: 'email',
      password: 'password',
    })
    submit(wrapper)

    expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      'email',
      'password',
    )
  })
})
