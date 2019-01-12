import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Segment } from 'semantic-ui-react'

import ScoreGraph from '@app/components/atoms/ScoreGraph'
import { Grade } from '@app/lib/score'

storiesOf('components|molecules/ScoreGraph', module).add('default', () => (
  <Segment.Group>
    <Segment>
      <ScoreGraph grade={Grade.Max} scoreRate={100} />
    </Segment>
    <Segment>
      <ScoreGraph grade={Grade.AAA} scoreRate={(8 / 9) * 100} />
    </Segment>
    <Segment>
      <ScoreGraph grade={Grade.AA} scoreRate={(7 / 9) * 100} />
    </Segment>
    <Segment>
      <ScoreGraph grade={Grade.A} scoreRate={(6 / 9) * 100} />
    </Segment>
    <Segment>
      <ScoreGraph grade={Grade.B} scoreRate={(5 / 9) * 100} />
    </Segment>
    <Segment>
      <ScoreGraph grade={Grade.C} scoreRate={(4 / 9) * 100} />
    </Segment>
    <Segment>
      <ScoreGraph grade={Grade.D} scoreRate={(3 / 9) * 100} />
    </Segment>
    <Segment>
      <ScoreGraph grade={Grade.E} scoreRate={(2 / 9) * 100} />
    </Segment>
    <Segment>
      <ScoreGraph grade={Grade.F} scoreRate={(1 / 9) * 100} />
    </Segment>
    <Segment>
      <ScoreGraph grade={null} scoreRate={0} />
    </Segment>
  </Segment.Group>
))
