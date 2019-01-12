import { number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Segment } from 'semantic-ui-react'

import GradeLabelGroup from '@app/components/molecules/GradeLabelGroup'
import { Grade } from '@app/lib/score'

storiesOf('components|molecules/GradeLabelGroup', module).add('default', () => {
  const currentDiff = number('Current Diff', 100, {
    range: true,
    min: 0,
    max: 999,
    step: 1,
  })
  const nextDiff = number('Next Diff', -100, {
    range: true,
    min: -999,
    max: 0,
    step: 1,
  })

  return (
    <Segment.Group>
      <Segment>
        <GradeLabelGroup
          current={{ grade: Grade.Max, diff: 0 }}
          next={{ grade: Grade.Max, diff: 0 }}
        />
      </Segment>
      <Segment>
        <GradeLabelGroup
          current={{ grade: Grade.AAA, diff: currentDiff }}
          next={{ grade: Grade.Max, diff: nextDiff }}
        />
      </Segment>
      <Segment>
        <GradeLabelGroup
          current={{ grade: Grade.AA, diff: currentDiff }}
          next={{ grade: Grade.AAA, diff: nextDiff }}
        />
      </Segment>
      <Segment>
        <GradeLabelGroup
          current={{ grade: Grade.A, diff: currentDiff }}
          next={{ grade: Grade.AA, diff: nextDiff }}
        />
      </Segment>
      <Segment>
        <GradeLabelGroup
          current={{ grade: Grade.B, diff: currentDiff }}
          next={{ grade: Grade.A, diff: nextDiff }}
        />
      </Segment>
      <Segment>
        <GradeLabelGroup
          current={{ grade: Grade.C, diff: currentDiff }}
          next={{ grade: Grade.B, diff: nextDiff }}
        />
      </Segment>
      <Segment>
        <GradeLabelGroup
          current={{ grade: Grade.D, diff: currentDiff }}
          next={{ grade: Grade.C, diff: nextDiff }}
        />
      </Segment>
      <Segment>
        <GradeLabelGroup
          current={{ grade: Grade.E, diff: currentDiff }}
          next={{ grade: Grade.D, diff: nextDiff }}
        />
      </Segment>
      <Segment>
        <GradeLabelGroup
          current={{ grade: Grade.F, diff: currentDiff }}
          next={{ grade: Grade.E, diff: nextDiff }}
        />
      </Segment>
      <Segment>
        <GradeLabelGroup
          current={{ grade: null, diff: 0 }}
          next={{ grade: null, diff: 0 }}
        />
      </Segment>
    </Segment.Group>
  )
})
