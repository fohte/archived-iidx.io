import * as _ from 'lodash'
import ErrorPage from 'next/error'
import * as React from 'react'
import { Divider } from 'semantic-ui-react'

import ResultTable, {
  Props as ResultTableProps,
} from '@app/components/molecules/ResultTable'
import ResultSearchForm, {
  FormValues,
} from '@app/components/organisms/ResultSearchForm'
import { GetUserResultsComponent } from '@app/queries'

export type Props = {
  screenName: string
  initialValues: FormValues
  onSubmit: (values: FormValues) => void
  defaultActivePage?: number
  numItemsPerPage?: number
  onPageChange?: ResultTableProps['onPageChange']
}

const ResultList: React.SFC<Props> = ({
  screenName,
  initialValues,
  onSubmit,
  onPageChange,
  numItemsPerPage = 20,
  defaultActivePage = 1,
}) => {
  const [formValues, setFormValues] = React.useState<FormValues>(initialValues)
  const [activePage, setActivePage] = React.useState(defaultActivePage)

  const changePage = (newActivePage: number) => {
    setActivePage(newActivePage)

    if (onPageChange) {
      onPageChange(newActivePage)
    }
  }

  return (
    <>
      <ResultSearchForm
        initialValues={formValues}
        onSubmit={values => {
          setFormValues(values)
          onSubmit(values)

          // reset the page
          changePage(1)
        }}
      />
      <Divider />
      <GetUserResultsComponent
        variables={{
          username: screenName,
          title: formValues.title,
          playStyle: formValues.playStyle,
          difficulties: formValues.difficulties,
          levels: formValues.levels,
        }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return 'loading'
          }
          if (error || !data || !data.searchMaps) {
            return <ErrorPage statusCode={404} />
          }

          const maps = _.map(
            data.searchMaps,
            ({ bestResult: result, ...map }) => ({ ...map, result }),
          )

          const totalPages = Math.ceil(maps.length / numItemsPerPage)
          const partialMaps = maps.slice(
            (activePage - 1) * numItemsPerPage,
            activePage * numItemsPerPage,
          )

          return (
            <ResultTable
              showMapData
              maps={partialMaps}
              screenName={screenName}
              totalPages={totalPages}
              activePage={activePage}
              onPageChange={newActivePage => {
                changePage(newActivePage)
              }}
            />
          )
        }}
      </GetUserResultsComponent>
    </>
  )
}

export default ResultList
