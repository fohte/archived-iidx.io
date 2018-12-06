import * as React from 'react'
import { Header } from 'semantic-ui-react'

import { FindMapMusic } from '@app/queries'

export type Props = {
  music: FindMapMusic
}

const Map: React.SFC<Props> = ({ music }) => (
  <>
    <Header as="h2">
      {music.title} {music.subTitle}
    </Header>
  </>
)
export default Map
