import { storiesOf } from '@storybook/react'
import * as _ from 'lodash'
import * as React from 'react'
import { Segment } from 'semantic-ui-react'

import DifficultyText from '@app/components/atoms/DifficultyText'
import { Difficulty, PlayStyle } from '@app/queries'

storiesOf('components|atoms/DifficultyText', module).add('default', () => (
  <Segment.Group>
    {_.flatMap(PlayStyle, playStyle =>
      _.map(Difficulty, difficulty => (
        <Segment key={`${playStyle}-${difficulty}`}>
          <DifficultyText playStyle={playStyle} difficulty={difficulty} />
        </Segment>
      )),
    )}
  </Segment.Group>
))
