import { GraphQLError } from 'graphql'
import ErrorPage from 'next/error'
import * as React from 'react'

import Profile from '@app/components/organisms/Profile'
import UserProfileLayout, {
  Tab,
} from '@app/components/templates/UserProfileLayout'
import initApollo from '@app/lib/initApollo'
import { parsePlayStyleString } from '@app/lib/queryParamParser'
import throwSSRError from '@app/lib/throwSSRError'
import { PageComponentType } from '@app/pages/_app'
import { PlayStyle } from '@app/queries'
import {
  FindUserDocument,
  FindUserQuery,
  FindUserUser,
  FindUserVariables,
} from '@app/queries'

export type Query = {
  screenName: string
  playStyle?: string
}

export type Props = {
  user?: FindUserUser | null
  errors?: ReadonlyArray<GraphQLError>
  loading: boolean
  playStyle?: PlayStyle
}

const ProfilePage: PageComponentType<Props, Props, Query> = ({
  loading,
  errors,
  user,
  playStyle,
}: Props) => {
  if (loading) {
    return <>loading</>
  }
  if (errors || !user || !playStyle) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <UserProfileLayout
      screenName={user.name}
      playStyle={playStyle}
      activeTab={Tab.Overview}
    >
      <Profile playStyle={playStyle} />
    </UserProfileLayout>
  )
}

ProfilePage.getInitialProps = async ({
  res,
  query: { screenName, playStyle = PlayStyle.Sp },
}) => {
  const client = initApollo()

  const result = await client.query<FindUserQuery, FindUserVariables>({
    query: FindUserDocument,
    variables: { screenName },
    errorPolicy: 'all',
  })

  if (!result.data.user) {
    throwSSRError(res, 404)
  }

  return {
    user: result.data.user,
    errors: result.errors,
    loading: result.loading,
    playStyle: parsePlayStyleString(playStyle),
  }
}

export default ProfilePage
