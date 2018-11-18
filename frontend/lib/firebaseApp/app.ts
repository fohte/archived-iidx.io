import * as firebase from 'firebase/app'
import 'firebase/auth'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const config = {
  apiKey: publicRuntimeConfig.firebaseApiKey,
  authDomain: publicRuntimeConfig.firebaseAuthDomain,
  projectId: publicRuntimeConfig.firebaseProjectId,
}

export default () =>
  firebase.apps.length ? firebase.app() : firebase.initializeApp(config)
