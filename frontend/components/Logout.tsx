import { auth } from '../lib/firebaseApp'

const handleLogout = async () => {
  try {
    await auth.signOut()
  } catch (e) {
    console.error(e)
  }
}

export default () => <button onClick={handleLogout}>logout</button>
