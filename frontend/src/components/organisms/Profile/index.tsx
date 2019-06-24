import * as React from 'react'

import { PlayStyle } from '@app/queries'

export interface Props {
  playStyle: PlayStyle
}

const Profile: React.SFC<Props> = ({ playStyle }) => <>{playStyle}</>

export default Profile
