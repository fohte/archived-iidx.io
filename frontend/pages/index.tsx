import { connect } from 'react-redux'

import Login from '../components/Login'
import Logout from '../components/Logout'
import withApollo from '../lib/withApollo'
import { State } from '../store'

const Root = ({ currentUser }: StateProps) =>
  currentUser ? (
    <div>
      {JSON.stringify(currentUser)}
      <Logout />
    </div>
  ) : (
    <Login />
  )

interface StateProps {
  currentUser: State['currentUser']
}

export default withApollo(
  connect((state: State): StateProps => ({ currentUser: state.currentUser }))(Root),
)
