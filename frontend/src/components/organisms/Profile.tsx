import * as React from 'react'
import { Header } from 'semantic-ui-react'

import { FindUserUser } from '@app/queries'
import { Link } from '@app/routes'

export type Props = {
  user: FindUserUser
}

const Profile: React.SFC<Props> = ({ user }) => (
  <>
    <Header as="h2">@{user.name}</Header>
    <Link route="musics" params={{ screenName: user.name }}>
      <a>musics</a>
    </Link>
  </>
)
export default Profile
