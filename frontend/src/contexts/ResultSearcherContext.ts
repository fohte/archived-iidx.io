import * as React from 'react'

import {
  ResultSearcherValueType,
  defaultValues,
} from '@app/models/ResultSearcherValue'
import { ResultSearcherDispatch } from '@app/reducers/resultSearcherReducer'

export interface ResultSearcherContextShape {
  values: ResultSearcherValueType
  dispatch: ResultSearcherDispatch
}

const ResultSearcherContext = React.createContext<ResultSearcherContextShape>({
  values: defaultValues,
  dispatch: () => {},
})

export default ResultSearcherContext
