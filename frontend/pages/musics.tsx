import * as _ from 'lodash'
import ErrorPage from 'next/error'
import Head from 'next/head'
import * as React from 'react'
import { Optional } from 'utility-types'

import MusicsPage from '@app/components/pages/MusicsPage'
import {
  ensureInteger,
  ensurePlayStyle,
  ensureString,
} from '@app/lib/queryParamParser'
import throwSSRError from '@app/lib/throwSSRError'
import {
  FilterFormValueJSON,
  parseQueryParams,
  parseJSON,
} from '@app/models/FilterFormValue'
import { PageComponentType } from '@pages/_app'
import { PlayStyle } from '@app/queries'

export type RequiredQuery = 'screenName' | 'playStyle'

export type OptionalQuery =
  | 'title'
  | 'difficulties'
  | 'levels'
  | 'grades'
  | 'onlyUpdated'
  | 'updatedOn'
  | 'page'

export type Query = { [key in RequiredQuery]: string } &
  { [key in OptionalQuery]?: string | string[] | undefined }

export interface Props extends Optional<FilterFormValueJSON> {
  screenName?: string
  playStyle?: PlayStyle
  page?: number
}

const PageComponent: PageComponentType<Props> = props => {
  const { screenName, playStyle, page, ...filterFormValues } = props

  if (!screenName || !playStyle) {
    return <ErrorPage statusCode={404} />
  }

  const parsedFilterFormValues = parseJSON(filterFormValues)

  return (
    <>
      <Head>
        <title>@{screenName} - Musics | iidx.io</title>
      </Head>
      <MusicsPage
        screenName={screenName}
        playStyle={playStyle}
        page={page}
        {...parsedFilterFormValues}
      />
    </>
  )
}

PageComponent.getInitialProps = ({ res, query }) => {
  try {
    const playStyle = ensurePlayStyle(query.playStyle, 'playStyle')
    const screenName = ensureString(query.screenName, 'screenName')
    const page = query.page ? ensureInteger(query.page, 'page') : 1

    const filterFormValues = parseQueryParams(query)

    return {
      screenName,
      playStyle,
      page,
      ...filterFormValues,
    }
  } catch (e) {
    throwSSRError(res, 404)
    console.error(e)
    return {}
  }
}

export default PageComponent
