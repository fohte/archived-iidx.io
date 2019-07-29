export type Maybe<T> = T | null

export enum Difficulty {
  Normal = 'NORMAL',
  Hyper = 'HYPER',
  Another = 'ANOTHER',
}

export enum PlayStyle {
  Sp = 'SP',
  Dp = 'DP',
}

export enum ClearLamp {
  Failed = 'FAILED',
  Assist = 'ASSIST',
  Easy = 'EASY',
  Normal = 'NORMAL',
  Hard = 'HARD',
  ExHard = 'EX_HARD',
  FullCombo = 'FULL_COMBO',
}

export enum Grade {
  A = 'A',
  Aa = 'AA',
  Aaa = 'AAA',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
}

/** An ISO 8601-encoded datetime */
export type Iso8601DateTime = any

// ====================================================
// Documents
// ====================================================

export type FindMapVariables = {
  id: string
  playStyle: PlayStyle
  difficulty: Difficulty
  username: string
}

export type FindMapQuery = {
  __typename?: 'Query'

  music: Maybe<FindMapMusic>
}

export type FindMapMusic = {
  __typename?: 'Music'

  id: string

  title: string

  genre: string

  artist: string

  textageUid: string

  series: number

  leggendaria: boolean

  map: Maybe<FindMapMap>
}

export type FindMapMap = {
  __typename?: 'Map'

  id: string

  numNotes: number

  level: number

  playStyle: PlayStyle

  difficulty: Difficulty

  minBpm: number

  maxBpm: number

  result: Maybe<FindMapResult>

  results: FindMapResults[]
}

export type FindMapResult = {
  __typename?: 'Result'

  id: string

  score: Maybe<number>

  missCount: Maybe<number>

  clearLamp: Maybe<ClearLamp>

  grade: Maybe<Grade>

  bpi: Maybe<number>

  lastPlayedAt: Iso8601DateTime
}

export type FindMapResults = {
  __typename?: 'Result'

  id: string

  score: Maybe<number>

  lastPlayedAt: Iso8601DateTime
}

export type FindUserVariables = {
  screenName: string
}

export type FindUserQuery = {
  __typename?: 'Query'

  user: Maybe<FindUserUser>
}

export type FindUserUser = {
  __typename: 'User'

  name: string
}

export type GetUserResultsVariables = {
  username: string
  title?: Maybe<string>
  levels?: Maybe<(Maybe<number>)[]>
  playStyle?: Maybe<PlayStyle>
  difficulties?: Maybe<(Maybe<Difficulty>)[]>
  offset?: Maybe<number>
  limit?: Maybe<number>
}

export type GetUserResultsQuery = {
  __typename?: 'Query'

  searchMaps: GetUserResultsSearchMaps
}

export type GetUserResultsSearchMaps = {
  __typename?: 'MapList'

  totalCount: number

  nodes: GetUserResultsNodes[]
}

export type GetUserResultsNodes = {
  __typename?: 'Map'

  id: string

  numNotes: number

  level: number

  difficulty: Difficulty

  playStyle: PlayStyle

  music: GetUserResultsMusic

  result: Maybe<GetUserResultsResult>
}

export type GetUserResultsMusic = {
  __typename?: 'Music'

  id: string

  title: string
}

export type GetUserResultsResult = {
  __typename?: 'Result'

  id: string

  score: Maybe<number>

  missCount: Maybe<number>

  clearLamp: Maybe<ClearLamp>

  bpi: Maybe<number>

  lastPlayedAt: Iso8601DateTime
}

export type GetViewerVariables = {}

export type GetViewerQuery = {
  __typename?: 'Query'

  viewer: Maybe<GetViewerViewer>
}

export type GetViewerViewer = {
  __typename: 'User'

  id: string

  name: string
}

export type RegisterVariables = {
  username: string
  displayName?: Maybe<string>
}

export type RegisterMutation = {
  __typename?: 'Mutation'

  createUser: Maybe<RegisterCreateUser>
}

export type RegisterCreateUser = {
  __typename?: 'CreateUserPayload'

  user: RegisterUser
}

export type RegisterUser = {
  __typename?: 'User'

  name: string

  profile: RegisterProfile
}

export type RegisterProfile = {
  __typename?: 'UserProfile'

  displayName: string
}

export type RegisterResultsWithCsvVariables = {
  csv: string
  playStyle: PlayStyle
}

export type RegisterResultsWithCsvMutation = {
  __typename?: 'Mutation'

  registerResultsWithCSV: Maybe<RegisterResultsWithCsvRegisterResultsWithCsv>
}

export type RegisterResultsWithCsvRegisterResultsWithCsv = {
  __typename?: 'RegisterResultsWithCSVPayload'

  success: boolean
}

import gql from 'graphql-tag'
import * as React from 'react'
import * as ReactApollo from 'react-apollo'

// ====================================================
// Components
// ====================================================

export const FindMapDocument = gql`
  query findMap(
    $id: ID!
    $playStyle: PlayStyle!
    $difficulty: Difficulty!
    $username: String!
  ) {
    music(id: $id) {
      id
      title
      genre
      artist
      textageUid
      series
      leggendaria
      map(playStyle: $playStyle, difficulty: $difficulty) {
        id
        numNotes
        level
        playStyle
        difficulty
        minBpm
        maxBpm
        result(username: $username) {
          id
          score
          missCount
          clearLamp
          grade
          bpi
          lastPlayedAt
        }
        results(username: $username) {
          id
          score
          lastPlayedAt
        }
      }
    }
  }
`
export class FindMapComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindMapQuery, FindMapVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindMapQuery, FindMapVariables>
        query={FindMapDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type FindMapProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindMapQuery, FindMapVariables>
> &
  TChildProps
export function FindMapHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindMapQuery,
        FindMapVariables,
        FindMapProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    FindMapQuery,
    FindMapVariables,
    FindMapProps<TChildProps>
  >(FindMapDocument, operationOptions)
}
export const FindUserDocument = gql`
  query findUser($screenName: String!) {
    user(name: $screenName) {
      __typename
      name
    }
  }
`
export class FindUserComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindUserQuery, FindUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindUserQuery, FindUserVariables>
        query={FindUserDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type FindUserProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindUserQuery, FindUserVariables>
> &
  TChildProps
export function FindUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindUserQuery,
        FindUserVariables,
        FindUserProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    FindUserQuery,
    FindUserVariables,
    FindUserProps<TChildProps>
  >(FindUserDocument, operationOptions)
}
export const GetUserResultsDocument = gql`
  query getUserResults(
    $username: String!
    $title: String
    $levels: [Int]
    $playStyle: PlayStyle
    $difficulties: [Difficulty]
    $offset: Int
    $limit: Int
  ) {
    searchMaps(
      title: $title
      levels: $levels
      playStyle: $playStyle
      difficulties: $difficulties
      offset: $offset
      limit: $limit
    ) {
      totalCount
      nodes {
        id
        numNotes
        level
        difficulty
        playStyle
        music {
          id
          title
        }
        result(username: $username) {
          id
          score
          missCount
          clearLamp
          bpi
          lastPlayedAt
        }
      }
    }
  }
`
export class GetUserResultsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetUserResultsQuery, GetUserResultsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetUserResultsQuery, GetUserResultsVariables>
        query={GetUserResultsDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type GetUserResultsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetUserResultsQuery, GetUserResultsVariables>
> &
  TChildProps
export function GetUserResultsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetUserResultsQuery,
        GetUserResultsVariables,
        GetUserResultsProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    GetUserResultsQuery,
    GetUserResultsVariables,
    GetUserResultsProps<TChildProps>
  >(GetUserResultsDocument, operationOptions)
}
export const GetViewerDocument = gql`
  query getViewer {
    viewer {
      __typename
      id
      name
    }
  }
`
export class GetViewerComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetViewerQuery, GetViewerVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetViewerQuery, GetViewerVariables>
        query={GetViewerDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type GetViewerProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetViewerQuery, GetViewerVariables>
> &
  TChildProps
export function GetViewerHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetViewerQuery,
        GetViewerVariables,
        GetViewerProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    GetViewerQuery,
    GetViewerVariables,
    GetViewerProps<TChildProps>
  >(GetViewerDocument, operationOptions)
}
export const RegisterDocument = gql`
  mutation register($username: String!, $displayName: String) {
    createUser(username: $username, displayName: $displayName) {
      user {
        name
        profile {
          displayName
        }
      }
    }
  }
`
export class RegisterComponent extends React.Component<
  Partial<ReactApollo.MutationProps<RegisterMutation, RegisterVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<RegisterMutation, RegisterVariables>
        mutation={RegisterDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type RegisterProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterVariables>
> &
  TChildProps
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterVariables
>
export function RegisterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutation,
        RegisterVariables,
        RegisterProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    RegisterMutation,
    RegisterVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, operationOptions)
}
export const RegisterResultsWithCsvDocument = gql`
  mutation registerResultsWithCSV($csv: String!, $playStyle: PlayStyle!) {
    registerResultsWithCSV(csv: $csv, playStyle: $playStyle) {
      success
    }
  }
`
export class RegisterResultsWithCsvComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      RegisterResultsWithCsvMutation,
      RegisterResultsWithCsvVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        RegisterResultsWithCsvMutation,
        RegisterResultsWithCsvVariables
      >
        mutation={RegisterResultsWithCsvDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type RegisterResultsWithCsvProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    RegisterResultsWithCsvMutation,
    RegisterResultsWithCsvVariables
  >
> &
  TChildProps
export type RegisterResultsWithCsvMutationFn = ReactApollo.MutationFn<
  RegisterResultsWithCsvMutation,
  RegisterResultsWithCsvVariables
>
export function RegisterResultsWithCsvHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterResultsWithCsvMutation,
        RegisterResultsWithCsvVariables,
        RegisterResultsWithCsvProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    RegisterResultsWithCsvMutation,
    RegisterResultsWithCsvVariables,
    RegisterResultsWithCsvProps<TChildProps>
  >(RegisterResultsWithCsvDocument, operationOptions)
}
