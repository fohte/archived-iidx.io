import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Login from '../components/Login'
import Logout from '../components/Logout'

const Root = () => (
  <Query
    query={gql`
      {
        viewer {
          uid
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>
      }
      if (error) {
        return <p>{error}</p>
      }

      return data.viewer ? (
        <div>
          {data.viewer.uid}
          <Logout />
        </div>
      ) : (
        <Login />
      )
    }}
  </Query>
)

export default Root
