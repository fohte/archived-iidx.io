import { number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as _ from 'lodash'
import * as React from 'react'
import { Segment } from 'semantic-ui-react'

import GradeLabel from '@app/components/atoms/GradeLabel'
import { Grade } from '@app/lib/score'

storiesOf('components|atoms/GradeLabel', module)
  .add('default', () => {
    const diff = number('Diff', 0, {
      range: true,
      min: -100,
      max: 100,
      step: 1,
    })

    return (
      <Segment.Group>
        <Segment>
          <GradeLabel grade={null} diff={diff} />
        </Segment>
        {_.map(Grade, (grade, key) => (
          <Segment key={key}>
            <GradeLabel grade={grade} diff={diff} />
          </Segment>
        ))}
      </Segment.Group>
    )
  })
  .add('diff is greater than 0', () => (
    <Segment>
      <GradeLabel grade={Grade.AAA} diff={1} />
    </Segment>
  ))
  .add('diff is 0', () => (
    <Segment>
      <GradeLabel grade={Grade.AAA} diff={0} />
    </Segment>
  ))
  .add('diff is less than 0', () => (
    <Segment>
      <GradeLabel grade={Grade.AAA} diff={-1} />
    </Segment>
  ))
