import { ApolloQueryResult, QueryOptions } from 'apollo-client'
import { Unsubscribe } from 'firebase'
import * as React from 'react'
import { withApollo } from 'react-apollo'

import AuthContext, {
  AuthContextShape,
  makeDefaultValues,
} from '@app/contexts/AuthContext'
import { auth } from '@app/lib/firebaseApp'
import { AppApolloClient } from '@app/lib/withApollo'
import { GetViewerDocument, GetViewerQuery } from '@app/queries'

interface ExternalProps {}

interface Props extends ExternalProps {
  client: AppApolloClient
}

type QueryResult = ApolloQueryResult<GetViewerQuery>

interface State extends AuthContextShape {
  errors?: QueryResult['errors']
}

class AuthStateProvider extends React.Component<Props, State> {
  public state: Readonly<State> = makeDefaultValues()
  private unsubscribe: Unsubscribe | null = null

  public async componentDidMount() {
    await this.fetchViewer()

    this.unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        this.setState({ loading: true, signedIn: true })
      } else {
        this.setState({ loading: true, signedIn: false })
      }

      await this.fetchViewer({ force: true })
      this.setState({ loading: false })
    })
  }

  public componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  public render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }

  private async fetchViewer(options: { force: boolean } = { force: false }) {
    const queryOptions: QueryOptions<GetViewerQuery> = {
      query: GetViewerDocument,
    }

    if (options.force) {
      queryOptions.fetchPolicy = 'network-only'
    }

    const result = await this.props.client.query<GetViewerQuery>(queryOptions)

    if (result.errors) {
      console.error(result.errors)
      this.setState({ errors: result.errors })
      return
    }

    if (result.loading) {
      this.setState({ loading: true })
      return
    }

    this.setState({ viewer: result.data.viewer || null })
  }
}

export default withApollo<ExternalProps>(AuthStateProvider)
