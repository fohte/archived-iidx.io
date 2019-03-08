import 'semantic-ui-css/semantic.min.css'
import './style.css'

import { withKnobs } from '@storybook/addon-knobs'
import { configure, addDecorator } from '@storybook/react'

import Router from 'next/router'

Router.router = {
  push: () => {},
  prefetch: () => {},
}

addDecorator(withKnobs)

const req = require.context('../stories', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
