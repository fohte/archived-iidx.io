import * as React from 'react'
import { Segment } from 'semantic-ui-react'

import MapTitleHeader from '@app/components/molecules/MapTitleHeader'
import ResultTable, { Result } from '@app/components/molecules/ResultTable'
import { FindMapMap, FindMapMusic } from '@app/queries'

export type Props = {
  music: FindMapMusic
  map: FindMapMap
  result?: Result
}

const MapDetail: React.SFC<Props> = ({ music, map, result }) => (
  <>
    <Segment basic textAlign="center">
      <MapTitleHeader music={music} map={map} />
    </Segment>

    <Segment basic>
      <ResultTable maps={[{ ...map, result }]} />
    </Segment>
  </>
)

export default MapDetail
