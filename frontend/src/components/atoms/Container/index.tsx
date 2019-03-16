import * as React from 'react'

import * as css from './style.scss'

type Props = {
  children?: React.ReactNode
}

const Container = ({ children }: Props) => (
  <div className={css.container}>{children}</div>
)

export default Container
