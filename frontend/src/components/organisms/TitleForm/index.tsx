import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import { toast } from 'react-toastify'

import ResultSearcherContext from '@app/contexts/ResultSearcherContext'
import { TitleFormValueType } from '@app/models/TitleFormValue'
import SearchInput from '@app/components/atoms/SearchInput'
import { UPDATE_TITLE_FORM } from '@app/reducers/resultSearcherReducer'

export interface Props {
  className?: string
}

const TitleForm: React.FC<Props> = ({ className }) => {
  const {
    values: { titleForm },
    dispatch,
  } = React.useContext(ResultSearcherContext)

  return (
    <FinalForm<TitleFormValueType>
      onSubmit={values => {
        dispatch({ type: UPDATE_TITLE_FORM, payload: values })
      }}
      initialValues={titleForm}
    >
      {({ handleSubmit, hasSubmitErrors, submitError }) => {
        if (hasSubmitErrors) {
          toast.error(submitError)
        }

        return (
          <form
            onSubmit={e => {
              handleSubmit(e)
            }}
          >
            <FinalField name="title">
              {({ input }) => <SearchInput className={className} {...input} />}
            </FinalField>
          </form>
        )
      }}
    </FinalForm>
  )
}

export default TitleForm
