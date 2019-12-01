import spacetime from 'spacetime'
import { Optional } from 'utility-types'

import ensureArray from '@app/lib/ensureArray'
import * as queryParamParser from '@app/lib/queryParamParser'
import { Difficulty, Grade } from '@app/queries'
import { QueryParam } from '@app/lib/types'

export interface FilterFormValueType {
  title?: string | null
  difficulties: Difficulty[]
  levels: number[]
  grades: Grade[]
  onlyUpdated: boolean
  updatedOn?: Date | null
}

export const defaultValues: Readonly<FilterFormValueType> = {
  title: null,
  difficulties: [],
  levels: [],
  grades: [],
  onlyUpdated: false,
  updatedOn: null,
}

export type FilterFormValueQueryParams = {
  [key in keyof FilterFormValueType]?: QueryParam
}

export interface FilterFormValueJSON {
  title?: string
  difficulties: Difficulty[]
  levels: number[]
  grades: Grade[]
  onlyUpdated: boolean
  updatedOn?: string
}

export const parseQueryParams = (
  query: FilterFormValueQueryParams,
): FilterFormValueJSON => ({
  title: query.title
    ? queryParamParser.ensureString(query.title, 'title')
    : undefined,
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
  title: json.title,
  difficulties: json.difficulties || [],
  levels: json.levels || [],
  grades: json.grades || [],
  onlyUpdated: !!json.onlyUpdated,
  updatedOn: json.updatedOn ? new Date(Date.parse(json.updatedOn)) : undefined,
})

export const compactValues = ({
  title,
  difficulties,
  levels,
  grades,
  onlyUpdated,
  updatedOn,
}: FilterFormValueType): Partial<FilterFormValueType> => {
  const newValues: Partial<FilterFormValueType> = {}

  if (title) {
    newValues.title = title
  }

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
