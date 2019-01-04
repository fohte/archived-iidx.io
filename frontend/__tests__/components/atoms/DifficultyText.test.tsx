import * as _ from 'lodash'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import DifficultyText from '@app/components/atoms/DifficultyText'
import { Difficulty, PlayStyle } from '@app/queries'

describe('DifficultyText', () => {
  _.forEach(PlayStyle, playStyle => {
    _.forEach(Difficulty, difficulty => {
      it(`renders correctly when ${playStyle} ${difficulty}`, () => {
        const tree = renderer
          .create(
            <DifficultyText playStyle={playStyle} difficulty={difficulty} />,
          )
          .toJSON()
        expect(tree).toMatchSnapshot()
      })
    })
  })
})
