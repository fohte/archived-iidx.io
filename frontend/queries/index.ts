/* tslint:disable */

export interface Query {
  musics?: Music[] | null /** Find musics. */
  user?: User | null /** Find a user by ID. */
  viewer?: User | null /** The currently authenticated user. */
}

export interface Music {
  artist: string
  genre: string
  id: string
  leggendaria: boolean
  maps: Map[]
  series: number
  subTitle: string
  textageUid: string
  title: string
}

export interface Map {
  difficulty: Difficulty
  id: string
  level: number
  maxBpm: number
  minBpm: number
  numNotes: number
  playStyle: PlayStyle
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

export enum Difficulty {
  NORMAL = 'NORMAL',
  HYPER = 'HYPER',
  ANOTHER = 'ANOTHER',
}

export enum PlayStyle {
  SP = 'SP',
  DP = 'DP',
}

export type GetMusicsWithMapsVariables = {}

export type GetMusicsWithMapsQuery = {
  __typename?: 'Query'
  musics?: GetMusicsWithMapsMusics[] | null
}

export type GetMusicsWithMapsMusics = {
  __typename?: 'Music'
  id: string
  title: string
  subTitle: string
  maps: GetMusicsWithMapsMaps[]
}

export type GetMusicsWithMapsMaps = {
  __typename?: 'Map'
  id: string
  difficulty: Difficulty
  level: number
  playStyle: PlayStyle
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

export class GetMusicsWithMapsComponent extends ReactApollo.Query<
  Query,
  GetMusicsWithMapsVariables
> {}
export class GetViewerComponent extends ReactApollo.Query<
  Query,
  GetViewerVariables
> {}
