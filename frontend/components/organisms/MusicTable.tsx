import { GetMusicsWithMapsMusics } from '@app/queries'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import flatMap from 'lodash/flatMap'

interface Props {
  musics: GetMusicsWithMapsMusics[]
}

interface Data {
  key: string
  title: string
  difficulty: string
  level: number
}

const columns: Array<ColumnProps<Data>> = [
  {
    title: 'Title',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'Difficulty',
    key: 'difficulty',
    dataIndex: 'difficulty',
  },
  {
    title: 'Level',
    key: 'level',
    dataIndex: 'level',
  },
]

const toTableData = (musics: Props['musics']): Data[] =>
  flatMap(musics, ({ title, subTitle, maps }) =>
    maps.map(({ id, difficulty, level }) => ({
      key: id,
      title: `${title} ${subTitle}`,
      difficulty,
      level,
    })),
  )

const MusicTable: React.SFC<Props> = ({ musics }) => {
  return <Table columns={columns} dataSource={toTableData(musics)} />
}

export default MusicTable
