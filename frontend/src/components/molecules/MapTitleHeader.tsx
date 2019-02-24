import * as React from 'react'
import { Header, List } from 'semantic-ui-react'

import { generateTextageURL } from '@app/lib/textage'
import { Difficulty, PlayStyle } from '@app/queries'

export interface Music {
  title: string
  genre: string
  artist: string
  series: number
  textageUid: string
}

export interface Map {
  level: number
  playStyle: PlayStyle
  difficulty: Difficulty
  minBpm: number
  maxBpm: number
  numNotes: number
}

export type Props = {
  music: Music
  map: Map
}

const printBPM = ({ minBpm, maxBpm }: Map) =>
  minBpm === maxBpm ? `${maxBpm}` : `${minBpm}-${maxBpm}`

const MapTitleHeader: React.SFC<Props> = ({ music, map }) => (
  <>
    <div>
      {music.genre}
      <Header as="h2">{music.title}</Header>
      {music.artist}
    </div>

    <div>
      <List divided horizontal>
        <List.Item>
          {map.playStyle} {map.difficulty}
        </List.Item>
        <List.Item>☆{map.level}</List.Item>
        <List.Item>BPM {printBPM(map)}</List.Item>
        <List.Item>{map.numNotes} notes</List.Item>
      </List>
    </div>

    <div>
      <span style={{ marginRight: '0.5em' }}>TexTage:</span>
      <List divided horizontal>
        {map.playStyle === PlayStyle.Sp ? (
          [1, 2].map((playSide: 1 | 2) => (
            <List.Item key={playSide}>
              <a
                href={generateTextageURL(music, map, {
                  playStyle: PlayStyle.Sp,
                  playSide,
                })}
              >{`${playSide}P`}</a>
            </List.Item>
          ))
        ) : (
          <List.Item>
            <a
              href={generateTextageURL(music, map, {
                playStyle: PlayStyle.Dp,
              })}
            >
              DP
            </a>
          </List.Item>
        )}
      </List>
    </div>
  </>
)

export default MapTitleHeader
