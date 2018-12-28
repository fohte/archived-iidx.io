import * as _ from 'lodash'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ResultTable, { Props } from '@app/components/molecules/ResultTable'
import { ClearLamp } from '@app/queries'

describe('ResultTable', () => {
  const makeResult = (result?: Partial<Props['result']>): Props['result'] => ({
    score: 0,
    missCount: 0,
    clearLamp: ClearLamp.Failed,
    ...result,
  })

  const makeMap = (map?: Partial<Props['map']>): Props['map'] => ({
    numNotes: 1000,
    ...map,
  })

  const cases: Array<{ props: Props; description: string }> = [
    {
      description: 'without result',
      props: { map: makeMap() },
    },
    ..._.map(ClearLamp, clearLamp => ({
      description: `when clear lamp is ${clearLamp}`,
      props: { map: makeMap(), result: makeResult({ clearLamp }) },
    })),
    ...[0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(score => ({
      description: `when score is ${score}/900`,
      props: { map: makeMap({ numNotes: 450 }), result: makeResult({ score }) },
    })),
  ]

  cases.forEach(({ description, props }) => {
    it(`renders correctly ${description}`, () => {
      const tree = renderer.create(<ResultTable {...props} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
