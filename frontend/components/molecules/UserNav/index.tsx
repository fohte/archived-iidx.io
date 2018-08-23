import { Icon } from 'antd'

import { InjectedProps } from 'lib/withViewer'
import LoginOrSignUp from './LoginOrSignUp'
import UserMenu from './UserMenu'

export interface Props extends InjectedProps {}

const UserNav: React.SFC<Props> = ({ loading, viewer }) => {
  if (loading) {
    return <Icon type="loading" />
  }

  if (viewer) {
    return <UserMenu displayName={viewer.uid} />
  } else {
    return <LoginOrSignUp />
  }
}

export default UserNav
