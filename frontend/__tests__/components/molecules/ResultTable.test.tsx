import { mount } from 'enzyme'
import * as _ from 'lodash'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ResultTable, {
  Map,
  Music,
  Props,
  Result,
} from '@app/components/molecules/ResultTable'
import { ClearLamp, Difficulty, PlayStyle } from '@app/queries'

describe('ResultTable', () => {
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

  const cases: Array<{ props: Props; description: string }> = [
    {
      description: 'without result',
      props: { maps: [makeMap()] },
    },
    ..._.map(ClearLamp, clearLamp => ({
      description: `when clear lamp is ${clearLamp}`,
      props: { maps: [makeMap({ result: makeResult({ clearLamp }) })] },
    })),
    ...[0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(score => ({
      description: `when score is ${score}/900`,
      props: {
        maps: [makeMap({ numNotes: 450, result: makeResult({ score }) })],
      },
    })),
    {
      description: 'when `showMapData` is true with a music',
      props: {
        maps: [makeMap({ result: makeResult(), music: makeMusic() })],
        showMapData: true,
      },
    },
    {
      description: 'when `showMapData` is false with a music',
      props: {
        maps: [makeMap({ result: makeResult(), music: makeMusic() })],
        showMapData: false,
      },
    },
    {
      description: 'with a onClickRow callback function',
      props: {
        maps: [makeMap()],
        onClickRow: () => {
          /* NOP */
        },
      },
    },
  ]

  cases.forEach(({ description, props }) => {
    it(`renders correctly ${description}`, () => {
      const tree = renderer.create(<ResultTable {...props} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  it('calls onClickRow when the row is clicked', () => {
    const map = makeMap()
    const onClickRow = jest.fn()
    const wrapper = mount(<ResultTable maps={[map]} onClickRow={onClickRow} />)

    wrapper
      .find('tbody tr')
      .first()
      .simulate('click')

    expect(onClickRow).toHaveBeenCalledWith(map)
  })
})
