import MusicTable from '@app/components/organisms/MusicTable'
import MainLayout from '@app/components/templates/MainLayout'
import {
  GetMusicsWithMapsComponent,
  GetMusicsWithMapsDocument,
} from '@app/queries'
import * as React from 'react'

const MusicsPage: React.SFC = () => (
  <MainLayout>
    <GetMusicsWithMapsComponent query={GetMusicsWithMapsDocument}>
      {({ loading, error, data }) => {
        if (loading) {
          return 'loading'
        }
        if (error || !data) {
          return 'error'
        }

        if (data.musics) {
          return <MusicTable musics={data.musics} />
        }
      }}
    </GetMusicsWithMapsComponent>
  </MainLayout>
)

export default MusicsPage
