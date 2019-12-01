import { Optional } from 'utility-types'

import * as FilterFormValue from '@app/models/FilterFormValue'
import * as TitleFormValue from '@app/models/TitleFormValue'

export interface ResultSearcherValueType {
  titleForm: TitleFormValue.TitleFormValueType
  filterForm: FilterFormValue.FilterFormValueType
}

export const resetValues = (): ResultSearcherValueType => ({
  titleForm: TitleFormValue.resetValues(),
  filterForm: FilterFormValue.resetValues(),
})

export const defaultValues: Readonly<ResultSearcherValueType> = resetValues()

export interface ResultSearcherValueQueryParams
  extends TitleFormValue.TitleFormValueQueryParams,
    FilterFormValue.FilterFormValueQueryParams {}

export interface ResultSearcherValueJSON {
  titleForm: TitleFormValue.TitleFormValueJSON
  filterForm: FilterFormValue.FilterFormValueJSON
}

export const parseQueryParams = (
  query: ResultSearcherValueQueryParams,
): ResultSearcherValueJSON => ({
  titleForm: TitleFormValue.parseQueryParams(query),
  filterForm: FilterFormValue.parseQueryParams(query),
})

export const toQueryParams = (
  formValues: ResultSearcherValueType,
): ResultSearcherValueQueryParams => ({
  ...TitleFormValue.toQueryParams(formValues.titleForm),
  ...FilterFormValue.toQueryParams(formValues.filterForm),
})

export const parseJSON = (
  json: Optional<ResultSearcherValueJSON>,
): ResultSearcherValueType => ({
  titleForm: json.titleForm
    ? TitleFormValue.parseJSON(json.titleForm)
    : TitleFormValue.resetValues(),
  filterForm: json.filterForm
    ? FilterFormValue.parseJSON(json.filterForm)
    : FilterFormValue.resetValues(),
})

export const compactValues = ({
  titleForm,
  filterForm,
}: ResultSearcherValueType) => ({
  titleForm: TitleFormValue.compactValues(titleForm),
  filterForm: FilterFormValue.compactValues(filterForm),
})
