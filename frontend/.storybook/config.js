import 'semantic-ui-css/semantic.min.css'
import './style.css'
import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

setOptions({
  hierarchyRootSeparator: /\|/,
})

const req = require.context('../stories', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
