import withViewer, { ExternalProps } from 'lib/withViewer'

const Root: React.SFC<ExternalProps> = props => (
  <div>{JSON.stringify(props)}</div>
)

export default withViewer()(Root)
