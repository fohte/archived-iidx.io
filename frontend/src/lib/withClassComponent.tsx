import React from 'react'

function withClassComponent<P>(Component: React.ComponentType<P>) {
  return class WithClassComponent extends React.Component<P> {
    public render() {
      return <Component {...this.props} />
    }
  }
}

export default withClassComponent
