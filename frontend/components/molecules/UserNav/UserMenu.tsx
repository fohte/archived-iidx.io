import * as React from 'react'
import { Dropdown } from 'semantic-ui-react'

import { auth } from '@app/lib/firebaseApp'

export interface Props {
  displayName: string
}

const UserMenu: React.SFC<Props> = ({ displayName }) => (
  <Dropdown item text={displayName} pointing>
    <Dropdown.Menu>
      <Dropdown.Item
        onClick={async () => {
          await auth.signOut()
        }}
      >
        Sign out
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default UserMenu
