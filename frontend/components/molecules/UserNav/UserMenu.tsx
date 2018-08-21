export interface Props {
  displayName: string
}

const UserMenu: React.SFC<Props> = ({ displayName }) => <div>{displayName}</div>

export default UserMenu
