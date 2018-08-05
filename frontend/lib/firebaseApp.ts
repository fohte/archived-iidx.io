import * as firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
}

const app = () =>
  firebase.apps.length ? firebase.app() : firebase.initializeApp(config)

export const auth = app().auth()
