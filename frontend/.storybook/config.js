import 'semantic-ui-css/semantic.min.css'
import './style.css'

import { withKnobs } from '@storybook/addon-knobs'
import { configure, addDecorator } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

setOptions({
  hierarchyRootSeparator: /\|/,
})

addDecorator(withKnobs)

const req = require.context('../stories', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
