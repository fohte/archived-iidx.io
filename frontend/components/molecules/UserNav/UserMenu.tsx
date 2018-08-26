import { auth } from 'lib/firebaseApp'

export interface Props {
  displayName: string
}

const UserMenu: React.SFC<Props> = ({ displayName }) => (
  <div>
    {displayName}{' '}
    <button
      onClick={async () => {
        await auth.signOut()
      }}
    >
      signout
    </button>
  </div>
)

export default UserMenu
