import * as React from 'react'

import { ResultSearcherContextShape } from '@app/contexts/ResultSearcherContext'

export type State = ResultSearcherContextShape['values']

export const UPDATE_VALUES = 'UPDATE_VALUES' as const

export interface UpdateValuesAction {
  type: typeof UPDATE_VALUES
  payload: State
}

export type ActionTypes = UpdateValuesAction

export type ResultSearcherReducer = React.Reducer<State, ActionTypes>
export type ResultSearcherDispatch = React.Dispatch<ActionTypes>

const resultSearcherReducer: ResultSearcherReducer = (_state, action) => {
  switch (action.type) {
    case UPDATE_VALUES:
      return action.payload

    default:
      throw new Error(`invalid action type: ${action.type}`)
  }
}

export default resultSearcherReducer
