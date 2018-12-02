import * as React from 'react'
import { Header } from 'semantic-ui-react'

import { FindUserUser } from '@app/queries'

export type Props = {
  user: FindUserUser
}

const Profile: React.SFC<Props> = ({ user }) => (
  <>
    <Header as="h2">@{user.name}</Header>
  </>
)
export default Profile
