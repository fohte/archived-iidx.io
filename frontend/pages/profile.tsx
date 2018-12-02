import ErrorPage from 'next/error'
import * as React from 'react'

import MainLayout from '@app/components/templates/MainLayout'
import initApollo from '@app/lib/initApollo'
import { PageComponentType } from '@app/pages/_app'
import {
  FindUserDocument,
  FindUserQuery,
  FindUserUser,
  FindUserVariables,
} from '@app/queries'

export type Query = {
  screenName: string
}

export type Props = {
  user?: FindUserUser | null
  errors?: any[]
  loading: boolean
}

const renderProfile = ({ loading, errors, user }: Props) => {
  if (loading) {
    return 'loading'
  }
  if (errors || !user) {
    return <ErrorPage statusCode={404} />
  }

  return JSON.stringify(user)
}

const ProfilePage: PageComponentType<Props, Props, Query> = props => (
  <MainLayout>{renderProfile(props)}</MainLayout>
)

ProfilePage.getInitialProps = async ({ res, query: { screenName } }) => {
  const client = initApollo()

  const result = await client.query<FindUserQuery, FindUserVariables>({
    query: FindUserDocument,
    variables: { screenName },
    errorPolicy: 'all',
  })

  if (!result.data.user) {
    if (res) {
      res.statusCode = 404
    }
  }

  return {
    user: result.data.user,
    errors: result.errors,
    loading: result.loading,
  }
}

export default ProfilePage
