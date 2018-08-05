import withRedux from 'next-redux-wrapper'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'

import * as actions from '../actions'
import { auth } from '../lib/firebaseApp'
import { initializeStore } from '../store'

class MyApp extends App {
  public static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    }
  }

  public render() {
    const { Component, pageProps } = this.props
    const { store } = this.props as any

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

const makeStore = () => {
  const store = initializeStore()

  auth.onAuthStateChanged(user => {
    if (user) {
      store.dispatch(actions.setCurrentUser({ currentUser: user }))
    } else {
      store.dispatch(actions.setCurrentUser({ currentUser: null }))
    }
  })

  return store
}

export default withRedux(makeStore)(MyApp)
