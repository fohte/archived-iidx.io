import { number, radios, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Segment } from 'semantic-ui-react'

import MapTitleHeader, { Props } from '@app/components/molecules/MapTitleHeader'
import { Difficulty, PlayStyle } from '@app/queries'

const makeMusic = (music: Partial<Props['music']> = {}): Props['music'] => ({
  title: music.title || text('Title', 'title'),
  subTitle: music.subTitle || text('Sub Title', 'subTitle'),
  genre: music.genre || text('Genre', 'genre'),
  artist: music.artist || text('Artist', 'artist'),
  series: music.series || number('Series', 1),
  textageUid: music.textageUid || text('TexTage UID', 'textageUid'),
})

const makeMap = (map: Partial<Props['map']> = {}): Props['map'] => ({
  level:
    map.level || number('Level', 1, { range: true, min: 1, max: 12, step: 1 }),
  playStyle:
    map.playStyle ||
    (radios('PlayStyle', PlayStyle as any, PlayStyle.Sp) as PlayStyle),
  difficulty:
    map.difficulty ||
    (radios('Difficulty', Difficulty as any, Difficulty.Another) as Difficulty),
  minBpm:
    map.minBpm ||
    number('Min BPM', 100, { range: true, min: 1, max: 999, step: 1 }),
  maxBpm:
    map.maxBpm ||
    number('Max BPM', 100, { range: true, min: 1, max: 999, step: 1 }),
  numNotes: map.numNotes || number('Number of Notes', 1000),
})

storiesOf('components|molecules/MapTitleHeader', module)
  .add('default', () => (
    <Segment>
      <MapTitleHeader music={makeMusic()} map={makeMap()} />
    </Segment>
  ))
  .add('playStyle is SP', () => (
    <Segment>
      <MapTitleHeader
        music={makeMusic()}
        map={makeMap({ playStyle: PlayStyle.Sp })}
      />
    </Segment>
  ))
  .add('playStyle is DP', () => (
    <Segment>
      <MapTitleHeader
        music={makeMusic()}
        map={makeMap({ playStyle: PlayStyle.Dp })}
      />
    </Segment>
  ))
  .add('BPM is 100', () => (
    <Segment>
      <MapTitleHeader
        music={makeMusic()}
        map={makeMap({ minBpm: 100, maxBpm: 100 })}
      />
    </Segment>
  ))
  .add('BPM is 100-400', () => (
    <Segment>
      <MapTitleHeader
        music={makeMusic()}
        map={makeMap({ minBpm: 100, maxBpm: 400 })}
      />
    </Segment>
  ))
