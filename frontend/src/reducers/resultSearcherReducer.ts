import * as React from 'react'

import { ResultSearcherContextShape } from '@app/contexts/ResultSearcherContext'

export type State = ResultSearcherContextShape['values']

export const UPDATE_TITLE_FORM = 'UPDATE_TITLE_FORM' as const
export const UPDATE_FILTER_FORM = 'UPDATE_FILTER_FORM' as const

export interface UpdateTitleFormAction {
  type: typeof UPDATE_TITLE_FORM
  payload: State['titleForm']
}

export interface UpdateFilterFormAction {
  type: typeof UPDATE_FILTER_FORM
  payload: State['filterForm']
}

export type ActionTypes = UpdateTitleFormAction | UpdateFilterFormAction

export type ResultSearcherReducer = React.Reducer<State, ActionTypes>
export type ResultSearcherDispatch = React.Dispatch<ActionTypes>

const resultSearcherReducer: ResultSearcherReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TITLE_FORM:
      return { ...state, titleForm: action.payload }

    case UPDATE_FILTER_FORM:
      return { ...state, filterForm: action.payload }
  }
}

export default resultSearcherReducer
