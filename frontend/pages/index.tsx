import { connect } from 'react-redux'

import Login from '../components/Login'
import Logout from '../components/Logout'
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

export default connect(
  (state: State): StateProps => ({ currentUser: state.currentUser }),
)(Root)
