import { storiesOf } from '@storybook/react'
import * as _ from 'lodash'
import * as React from 'react'
import { Segment } from 'semantic-ui-react'

import ResultTable, {
  Map,
  Music,
  Result,
} from '@app/components/molecules/ResultTable'
import { ClearLamp, Difficulty, PlayStyle } from '@app/queries'

const makeResult = (result?: Partial<Result>): Result => ({
  score: 0,
  missCount: 0,
  clearLamp: ClearLamp.Failed,
  ...result,
})

const makeMusic = (music?: Partial<Music>): Music => ({
  id: '0',
  title: 'title',
  subTitle: 'subTitle',
  ...music,
})

const makeMap = (map?: Partial<Map>): Map => ({
  numNotes: 1000,
  level: 12,
  difficulty: Difficulty.Another,
  playStyle: PlayStyle.Sp,
  ...map,
})

storiesOf('components|molecules/ResultTable', module)
  .add('default', () => (
    <Segment>
      <ResultTable
        maps={[
          makeMap(),
          ..._.map(ClearLamp, clearLamp =>
            makeMap({ result: makeResult({ clearLamp }) }),
          ),
          ...[0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(score =>
            makeMap({ numNotes: 450, result: makeResult({ score }) }),
          ),
        ]}
      />
    </Segment>
  ))
  .add('when `showMapData` is true with a music', () => (
    <Segment>
      <ResultTable
        maps={[makeMap({ result: makeResult(), music: makeMusic() })]}
        showMapData
      />
    </Segment>
  ))
  .add('when `showMapData` is false with a music', () => (
    <Segment>
      <ResultTable
        maps={[makeMap({ result: makeResult(), music: makeMusic() })]}
        showMapData={false}
      />
    </Segment>
  ))
  .add('with a onClickRow callback function', () => (
    <Segment>
      <ResultTable
        maps={[makeMap()]}
        onClickRow={() => {
          /* NOP */
        }}
      />
    </Segment>
  ))
