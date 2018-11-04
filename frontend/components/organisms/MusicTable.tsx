import { flatMap } from 'lodash'
import * as React from 'react'
import { Icon, Pagination, Table } from 'semantic-ui-react'

import { GetComponentProps } from '@app/lib/types'
import { GetMusicsWithMapsMusics } from '@app/queries'

export interface Props {
  musics: GetMusicsWithMapsMusics[]
  numItemsPerPage: number
}

interface State {
  activePage: number
}

class MusicTable extends React.PureComponent<Props, State> {
  public static defaultProps: Partial<Props> = {
    numItemsPerPage: 20,
  }

  public state: Readonly<State> = {
    activePage: 1,
  }

  public render() {
    const { musics: allMusics, numItemsPerPage } = this.props
    const { activePage } = this.state

    const totalPages = Math.ceil(allMusics.length / numItemsPerPage)
    const musics = allMusics.slice(
      (activePage - 1) * numItemsPerPage,
      activePage * numItemsPerPage,
    )

    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Difficulty</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {flatMap(musics, music =>
              music.maps.map(map => (
                <Table.Row key={`${music.id}.${map.id}`}>
                  <Table.Cell>
                    {music.title} {music.subTitle}
                  </Table.Cell>
                  <Table.Cell>{map.difficulty}</Table.Cell>
                  <Table.Cell>{map.level}</Table.Cell>
                </Table.Row>
              )),
            )}
          </Table.Body>
        </Table>

        <div style={{ textAlign: 'right' }}>
          <Pagination
            activePage={activePage}
            ellipsisItem={{
              content: <Icon name="ellipsis horizontal" />,
              icon: true,
            }}
            firstItem={{
              content: <Icon name="angle double left" />,
              icon: true,
            }}
            lastItem={{
              content: <Icon name="angle double right" />,
              icon: true,
            }}
            prevItem={{ content: <Icon name="angle left" />, icon: true }}
            nextItem={{ content: <Icon name="angle right" />, icon: true }}
            totalPages={totalPages}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    )
  }

  private handlePageChange: GetComponentProps<Pagination>['onPageChange'] = (
    _,
    { activePage },
  ) => {
    if (activePage == null) {
      return
    }

    this.setState({ activePage: Number(activePage) })
  }
}

export default MusicTable
