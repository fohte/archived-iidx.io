import * as _ from 'lodash'
import { Optional } from 'utility-types'
import spacetime from 'spacetime'

import ensureArray from '@app/lib/ensureArray'
import * as queryParamParser from '@app/lib/queryParamParser'
import { Difficulty, Grade } from '@app/queries'
import { QueryParam } from '@app/lib/types'

export interface FilterFormValueType {
  difficulties: Difficulty[]
  levels: number[]
  grades: Grade[]
  onlyUpdated: boolean
  updatedOn?: Date | null
}

export const resetValues = (): FilterFormValueType => ({
  difficulties: [],
  levels: [],
  grades: [],
  onlyUpdated: false,
  updatedOn: null,
})

export const defaultValues: Readonly<FilterFormValueType> = resetValues()

export type FilterFormValueQueryParams = {
  [key in keyof FilterFormValueType]?: QueryParam
}

export interface FilterFormValueJSON {
  difficulties: Difficulty[]
  levels: number[]
  grades: Grade[]
  onlyUpdated: boolean
  updatedOn?: string
}

export const parseQueryParams = (
  query: FilterFormValueQueryParams,
): FilterFormValueJSON => ({
  difficulties: queryParamParser.ensureArray(
    queryParamParser.ensureDifficulty,
    query.difficulties,
    'difficulties',
  ),
  levels: queryParamParser.ensureArray(
    queryParamParser.ensureInteger,
    query.levels,
    'levels',
  ),
  grades: queryParamParser.ensureArray(
    queryParamParser.ensureGrade,
    query.grades,
    'grades',
  ),
  onlyUpdated: query.onlyUpdated
    ? queryParamParser.ensureString(query.onlyUpdated, 'onlyUpdated') === 'true'
    : false,
  updatedOn: query.updatedOn
    ? queryParamParser.ensureString(query.updatedOn, 'updatedOn')
    : undefined,
})

export const toQueryParams = (
  formValues: FilterFormValueType,
): FilterFormValueQueryParams => {
  const newQuery: FilterFormValueQueryParams = {}

  if (formValues.levels && formValues.levels.length !== 0) {
    newQuery.levels = ensureArray(formValues.levels).map(l => l.toString())
  }

  if (formValues.difficulties && formValues.difficulties.length !== 0) {
    newQuery.difficulties = ensureArray(
      formValues.difficulties,
    ).map((d: Difficulty) => d.toLowerCase())
  }

  if (formValues.grades && formValues.grades.length !== 0) {
    newQuery.grades = ensureArray(formValues.grades).map((g: Grade) =>
      g.toLowerCase(),
    )
  }

  if (formValues.onlyUpdated) {
    newQuery.onlyUpdated = 'true'
  }

  if (formValues.updatedOn) {
    newQuery.updatedOn = spacetime(formValues.updatedOn).format(
      'yyyy-MM-dd',
    ) as string
  }

  return newQuery
}

export const parseJSON = (
  json: Optional<FilterFormValueJSON>,
): FilterFormValueType => ({
  difficulties: json.difficulties || [],
  levels: json.levels || [],
  grades: json.grades || [],
  onlyUpdated: !!json.onlyUpdated,
  updatedOn: json.updatedOn ? new Date(Date.parse(json.updatedOn)) : undefined,
})

export const compactValues = ({
  difficulties,
  levels,
  grades,
  onlyUpdated,
  updatedOn,
}: FilterFormValueType): Partial<FilterFormValueType> => {
  const newValues: Partial<FilterFormValueType> = {}

  if (difficulties.length !== 0) {
    newValues.difficulties = difficulties
  }

  if (levels.length !== 0) {
    newValues.levels = levels
  }

  if (grades.length !== 0) {
    newValues.grades = grades
  }

  if (onlyUpdated) {
    newValues.onlyUpdated = onlyUpdated

    if (updatedOn) {
      newValues.updatedOn = updatedOn
    }
  }

  return newValues
}

export const isEmpty = (values: FilterFormValueType): boolean =>
  _.isEmpty(compactValues(values))
