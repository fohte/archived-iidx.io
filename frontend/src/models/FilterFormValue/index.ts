import { Difficulty, Grade } from '@app/queries'

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
