import * as _ from 'lodash'
import * as React from 'react'

import MusicsFolderList from '@app/components/organisms/MusicsFolderList'
import UserProfileLayout, {
  Tab,
} from '@app/components/templates/UserProfileLayout'

export interface Props {
  screenName: string
}

const MusicFoldersPage = ({ screenName }: Props) => (
  <UserProfileLayout screenName={screenName} activeTab={Tab.Musics}>
    <MusicsFolderList screenName={screenName} />
  </UserProfileLayout>
)

export default MusicFoldersPage
