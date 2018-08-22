import LoginForm, { Props } from 'components/organisms/LoginForm'
import MainLayout from 'components/templates/MainLayout'
import { auth, ErrorType } from 'lib/firebaseApp'

const submitRequest: NonNullable<Props['submitRequest']> = async values => {
  await auth
    .signInWithEmailAndPassword(values.email, values.password)
    .catch((err: ErrorType) => {
      throw new Error(err.message)
    })
}

const LoginPage: React.SFC = () => (
  <MainLayout>
    <LoginForm submitRequest={submitRequest} />
  </MainLayout>
)

export default LoginPage
