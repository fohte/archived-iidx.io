import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import getConfig from 'next/config'
jest.mock('next/config')
;(getConfig as jest.Mock).mockImplementation(() => ({
  serverRuntimeConfig: {
    privateApiUrl: 'privateApiUrl',
  },
  publicRuntimeConfig: {
    firebaseApiKey: 'firebaseApiKey',
    firebaseAuthDomain: 'firebaseAuthDomain',
    firebaseProjectId: 'firebaseProjectId',
    publicApiUrl: 'publicApiUrl',
    version: 'test',
  },
}))

import * as firebaseMock from 'firebase-mock'

const mockAuth = new firebaseMock.MockAuthentication()
const mockSDK = new firebaseMock.MockFirebaseSdk(
  // RTDB
  null,
  // AUTHENTICATION
  () => mockAuth,
  // FIRESTORE
  null,
  // STORAGE
  null,
  // MESSAGING
  null,
)

import * as app from '@app/lib/firebaseApp/app'

jest.mock('@app/lib/firebaseApp/app')
;(app as any).default = jest.fn(() => mockSDK)

import Router from 'next/router'
;(Router.router as any) = {
  push: () => {}, // tslint:disable-line:no-empty
  prefetch: () => {}, // tslint:disable-line:no-empty
}
