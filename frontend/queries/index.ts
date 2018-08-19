/* tslint:disable */

export interface Query {
  user?: User | null /** Find a user by ID. */
  viewer?: User | null /** The currently authenticated user. */
}

export interface User {
  id: string
  profile: UserProfile
  uid: string
}

export interface UserProfile {
  name: string
}

export interface Mutation {}
export interface UserQueryArgs {
  id: string
}

export type GetViewerVariables = {}

export type GetViewerQuery = {
  __typename?: 'Query'
  viewer?: GetViewerViewer | null
}

export type GetViewerViewer = {
  __typename?: 'User'
  id: string
  uid: string
}

import * as ReactApollo from 'react-apollo'

export class GetViewerComponent extends ReactApollo.Query<
  Query,
  GetViewerVariables
> {}
