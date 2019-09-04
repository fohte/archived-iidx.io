import * as _ from 'lodash'
import ErrorPage from 'next/error'
import Head from 'next/head'
import * as React from 'react'

import StatsPage from '@app/components/pages/StatsPage'
import { ensurePlayStyle, ensureString } from '@app/lib/queryParamParser'
import throwSSRError from '@app/lib/throwSSRError'
import { PageQuery } from '@app/lib/types'
import { PageComponentType } from '@pages/_app'
import { PlayStyle } from '@app/queries'

export type RequiredQuery = 'screenName' | 'playStyle'

export type Query = PageQuery<RequiredQuery>

export interface Props {
  screenName?: string
  playStyle?: PlayStyle
}

const PageComponent: PageComponentType<Props> = ({
  screenName,
  playStyle,
}: Props) => {
  if (!screenName || !playStyle) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>@{screenName} - Stats | iidx.io</title>
      </Head>
      <StatsPage screenName={screenName} playStyle={playStyle} />
    </>
  )
}

PageComponent.getInitialProps = ({ res, query }) => {
  let playStyle: PlayStyle
  let screenName: string

  try {
    playStyle = ensurePlayStyle(query.playStyle, 'playStyle')
    screenName = ensureString(query.screenName, 'screenName')
  } catch (e) {
    throwSSRError(res, 404)
    console.error(e)
    return {}
  }

  return {
    screenName,
    playStyle,
  }
}

export default PageComponent
