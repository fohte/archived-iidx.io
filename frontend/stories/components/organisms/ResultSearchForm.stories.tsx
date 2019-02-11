import { actions } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import ResultSearchForm, {
  FormValues,
} from '@app/components/organisms/ResultSearchForm'
import { PlayStyle } from '@app/queries'

const events = actions('onSubmit')

storiesOf('components|organisms/ResultSearchForm', module).add(
  'default',
  () => {
    const initialValues: FormValues = {
      title: null,
      playStyle: PlayStyle.Sp,
      difficulties: [],
      levels: [],
    }

    return <ResultSearchForm {...events} initialValues={initialValues} />
  },
)
