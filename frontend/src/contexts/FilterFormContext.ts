import * as React from 'react'

import { FilterFormValueType, defaultValues } from '@app/models/FilterFormValue'
import { FilterFormDispatch } from '@app/reducers/filterFormReducer'

export interface FilterFormContextShape {
  values: FilterFormValueType
  dispatch: FilterFormDispatch
}

const FilterFormContext = React.createContext<FilterFormContextShape>({
  values: defaultValues,
  dispatch: () => {},
})

export default FilterFormContext
