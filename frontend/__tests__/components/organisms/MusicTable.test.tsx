import * as React from 'react'
import * as renderer from 'react-test-renderer'

import MusicTable, { Props } from '@app/components/organisms/MusicTable'
import { Difficulty, PlayStyle } from '@app/queries'

describe('MusicTable', () => {
  it('renders correctly', () => {
    const musics: Props['musics'] = [
      {
        id: '1',
        title: 'title',
        subTitle: 'subTitle',
        maps: [
          {
            id: '1',
            difficulty: Difficulty.Another,
            level: 1,
            playStyle: PlayStyle.Sp,
          },
        ],
      },
    ]

    const component = renderer.create(<MusicTable musics={musics} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
