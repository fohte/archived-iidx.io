import * as React from 'react'
import { Header, List } from 'semantic-ui-react'

import { generateTextageURL } from '@app/lib/textage'
import { FindMapMap, FindMapMusic, PlayStyle } from '@app/queries'

export type Props = {
  music: FindMapMusic
  map: FindMapMap
}

const printBPM = ({ minBpm, maxBpm }: FindMapMap) =>
  minBpm === maxBpm ? `${maxBpm}` : `${minBpm}-${maxBpm}`

const MapTitleHeader: React.SFC<Props> = ({ music, map }) => (
  <>
    <div>
      {music.genre}
      <Header as="h2">
        {music.title} {music.subTitle}
      </Header>
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
