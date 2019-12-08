import * as _ from 'lodash'
import { Optional } from 'utility-types'

import * as queryParamParser from '@app/lib/queryParamParser'
import { QueryParam } from '@app/lib/types'

export interface TitleFormValueType {
  title?: string | null
}

export const resetValues = (): TitleFormValueType => ({
  title: null,
})

export const defaultValues: Readonly<TitleFormValueType> = resetValues()

export type TitleFormValueQueryParams = {
  [key in keyof TitleFormValueType]?: QueryParam
}

export interface TitleFormValueJSON {
  title?: string
}

export const parseQueryParams = (
  query: TitleFormValueQueryParams,
): TitleFormValueJSON => ({
  title: query.title
    ? queryParamParser.ensureString(query.title, 'title')
    : undefined,
})

export const toQueryParams = (
  formValues: TitleFormValueType,
): TitleFormValueQueryParams => {
  const newQuery: TitleFormValueQueryParams = {}

  if (formValues.title) {
    newQuery.title = formValues.title
  }

  return newQuery
}

export const parseJSON = (
  json: Optional<TitleFormValueJSON>,
): TitleFormValueType => ({
  title: json.title,
})

export const compactValues = ({
  title,
}: TitleFormValueType): Partial<TitleFormValueType> => {
  const newValues: Partial<TitleFormValueType> = {}

  if (title) {
    newValues.title = title
  }

  return newValues
}

export const isEmpty = (values: TitleFormValueType): boolean =>
  _.isEmpty(compactValues(values))
