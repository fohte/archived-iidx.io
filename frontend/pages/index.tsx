import withViewer, { WithViewerProps } from '../lib/withViewer'

const Root: React.SFC<WithViewerProps> = props => (
  <div>{JSON.stringify(props)}</div>
)

export default withViewer(Root)
