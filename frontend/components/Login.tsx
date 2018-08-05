import { auth } from '../lib/firebaseApp'

const handleLogin = async () => {
  try {
    await auth.signInWithEmailAndPassword(
      window.prompt('email') || '',
      window.prompt('password') || '',
    )
  } catch (e) {
    console.error(e)
  }
}

export default () => <button onClick={handleLogin}>login</button>
