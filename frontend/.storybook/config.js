import 'semantic-ui-css/semantic.min.css'
import './style.css'

import { withKnobs } from '@storybook/addon-knobs'
import { configure, addDecorator } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'

import Router from 'next/router'

Router.router = {
  push: () => {},
  prefetch: () => {},
}

addDecorator(withKnobs)

addDecorator(
  withOptions({
    hierarchyRootSeparator: /\|/,
  }),
)

const req = require.context('../stories', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
