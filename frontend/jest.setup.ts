import * as registerRequireContextHook from 'babel-plugin-require-context-hook/register'
registerRequireContextHook()

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

import { Mock } from 'firebase-nightlight'

import * as app from '@app/lib/firebaseApp/app'
;(app as any).default = jest.fn(() => new Mock().initializeApp({}))

import Router from 'next/router'
;(Router.router as any) = {
  push: () => {}, // tslint:disable-line:no-empty
  prefetch: () => {}, // tslint:disable-line:no-empty
}

import 'jest-date-mock'
import { advanceTo } from 'jest-date-mock'

advanceTo(new Date(2018, 1, 1, 0, 0, 0))
