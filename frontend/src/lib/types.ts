export type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never

export type WithLoadingState<P> = { loading: true } | ({ loading: false } & P)
