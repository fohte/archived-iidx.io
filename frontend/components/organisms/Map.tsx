import * as React from 'react'
import { Segment } from 'semantic-ui-react'

import MapTitleHeader from '@app/components/molecules/MapTitleHeader'
import { FindMapMap, FindMapMusic } from '@app/queries'

export type Props = {
  music: FindMapMusic
  map: FindMapMap
}

const Map: React.SFC<Props> = ({ music, map }) => (
  <>
    <Segment basic textAlign="center">
      <MapTitleHeader music={music} map={map} />
    </Segment>
  </>
)

export default Map
