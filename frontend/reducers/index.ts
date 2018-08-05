import { reducerWithoutInitialState } from 'typescript-fsa-reducers'

import * as actions from '../actions'

export const reducer = reducerWithoutInitialState().case(
  actions.setCurrentUser,
  (state, { currentUser }) => ({ ...state, currentUser }),
)
