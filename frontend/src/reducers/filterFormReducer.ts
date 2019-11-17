import * as React from 'react'

import { FilterFormContextShape } from '@app/contexts/FilterFormContext'

export type State = FilterFormContextShape['values']

export const UPDATE_VALUES = 'UPDATE_VALUES' as const

export interface UpdateValuesAction {
  type: typeof UPDATE_VALUES
  payload: State
}

export type ActionTypes = UpdateValuesAction

export type FilterFormReducer = React.Reducer<State, ActionTypes>
export type FilterFormDispatch = React.Dispatch<ActionTypes>

const filterFormReducer: FilterFormReducer = (_state, action) => {
  switch (action.type) {
    case UPDATE_VALUES:
      return action.payload

    default:
      throw new Error(`invalid action type: ${action.type}`)
  }
}

export default filterFormReducer
