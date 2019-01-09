import { addDecorator, configure } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import { setOptions } from '@storybook/addon-options'

setOptions({
  hierarchyRootSeparator: /\|/,
})

addDecorator(
  withInfo({
    styles: {
      header: {
        h1: {
          marginRight: '20px',
          fontSize: '25px',
          display: 'inline',
        },
        body: {
          paddingTop: 0,
          paddingBottom: 0,
        },
        h2: {
          display: 'inline',
          color: '#999',
        },
      },
      infoBody: {
        backgroundColor: '#eee',
        padding: '0px 5px',
        lineHeight: '2',
      },
    },
    inline: true,
    source: false,
  }),
)

const req = require.context('../stories', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
