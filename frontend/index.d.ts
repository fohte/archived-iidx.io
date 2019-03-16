declare module '*.graphql' {
  const value: any
  export default value
}

declare module '*.gql' {
  const value: any
  export default value
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}
