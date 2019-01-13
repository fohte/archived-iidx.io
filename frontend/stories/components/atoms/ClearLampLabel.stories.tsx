import { storiesOf } from '@storybook/react'
import * as _ from 'lodash'
import * as React from 'react'
import { Segment } from 'semantic-ui-react'

import ClearLampLabel from '@app/components/atoms/ClearLampLabel'
import { ClearLamp } from '@app/queries'

storiesOf('components|atoms/ClearLampLabel', module).add('default', () => (
  <Segment.Group>
    <Segment>
      <ClearLampLabel clearLamp={null} />
    </Segment>
    {_.map(ClearLamp, (clearLamp, key) => (
      <Segment key={key}>
        <ClearLampLabel clearLamp={clearLamp} />
      </Segment>
    ))}
  </Segment.Group>
))
