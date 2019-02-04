import * as _ from 'lodash'
import ErrorPage from 'next/error'
import * as React from 'react'

import ResultList from '@app/components/organisms/ResultList'
import MainLayout from '@app/components/templates/MainLayout'
import throwSSRError from '@app/lib/throwSSRError'
import { PageComponentType } from '@app/pages/_app'

export type Query = {
  screenName: string
  playStyle?: string
  difficulty?: string
}

export type Props = {
  screenName?: string
}

const renderMap = ({ screenName }: Props) => {
  if (!screenName) {
    return <ErrorPage statusCode={404} />
  }

  return <ResultList screenName={screenName} />
}

const MusicsPage: PageComponentType<Props, Props, Query> = props => (
  <MainLayout>{renderMap(props)}</MainLayout>
)

MusicsPage.getInitialProps = ({ res, query }) => {
  if (!query.screenName) {
    throwSSRError(res, 404)
    return {}
  }

  return {
    screenName: query.screenName,
  }
}

export default MusicsPage
