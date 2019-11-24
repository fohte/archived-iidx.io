export type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never

export type WithLoadingState<P> = { loading: true } | ({ loading: false } & P)

export type QueryParam = string | string[]

export type PageQuery<
  RequiredQuery extends string | never = never,
  OptionalQuery extends string | never = never
> = {
  [key in RequiredQuery]: string
} &
  { [key in OptionalQuery]: QueryParam | undefined }
