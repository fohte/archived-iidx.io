import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

import { reducer } from './reducers'

export interface State {
  currentUser: firebase.User | null
}

const initialState: State = {
  currentUser: null,
}

export const initializeStore = () =>
  createStore(reducer, initialState, devToolsEnhancer({}))
