import classnames from 'classnames/bind'
import * as React from 'react'
import {
  cssTransition,
  ToastContainer as ReactToastifyContainer,
} from 'react-toastify'

import * as css from './style.scss'

const cx = classnames.bind(css)

const Zoom = cssTransition({
  enter: cx('zoom-in'),
  exit: cx('zoom-out'),
  duration: 300,
})

const ToastContainer = () => (
  <ReactToastifyContainer hideProgressBar transition={Zoom} draggable={false} />
)

export default ToastContainer
