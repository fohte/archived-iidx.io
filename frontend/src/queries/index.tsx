import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHoc from '@apollo/react-hoc'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any
}

export enum ClearLamp {
  /** Failed */
  Failed = 'FAILED',
  /** Assist Clear */
  Assist = 'ASSIST',
  /** Easy Clear */
  Easy = 'EASY',
  /** Clear */
  Normal = 'NORMAL',
  /** Hard Clear */
  Hard = 'HARD',
  /** EX Hard Clear */
  ExHard = 'EX_HARD',
  /** FullCombo Clear */
  FullCombo = 'FULL_COMBO',
}

/** Autogenerated return type of CreateUser */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload'
  user: User
}

export enum Difficulty {
  /** Beginner */
  Beginner = 'BEGINNER',
  /** Normal */
  Normal = 'NORMAL',
  /** Hyper */
  Hyper = 'HYPER',
  /** Another */
  Another = 'ANOTHER',
  /** Leggendaria */
  Leggendaria = 'LEGGENDARIA',
}

export enum Grade {
  /** AAA */
  Aaa = 'AAA',
  /** AA */
  Aa = 'AA',
  /** A */
  A = 'A',
  /** B */
  B = 'B',
  /** C */
  C = 'C',
  /** D */
  D = 'D',
  /** E */
  E = 'E',
  /** F */
  F = 'F',
  /** NO PLAY */
  NoPlay = 'NO_PLAY',
}

export type GradeDiff = {
  __typename?: 'GradeDiff'
  diff: Scalars['Int']
  grade: GradeDiffGrade
}

export enum GradeDiffGrade {
  /** Max */
  Max = 'MAX',
  /** AAA */
  Aaa = 'AAA',
  /** AA */
  Aa = 'AA',
  /** A */
  A = 'A',
  /** B */
  B = 'B',
  /** C */
  C = 'C',
  /** D */
  D = 'D',
  /** E */
  E = 'E',
  /** F */
  F = 'F',
}

export type LevelGradeCount = {
  __typename?: 'LevelGradeCount'
  count: Scalars['Int']
  grade: Grade
  level: Scalars['Int']
}

export type Map = {
  __typename?: 'Map'
  difficulty: Difficulty
  id: Scalars['ID']
  level: Scalars['Int']
  maxBpm: Scalars['Int']
  minBpm: Scalars['Int']
  music: Music
  numNotes: Scalars['Int']
  playStyle: PlayStyle
  result?: Maybe<Result>
  results: Array<Result>
}

export type MapResultArgs = {
  username: Scalars['String']
  lastPlayedSince?: Maybe<Scalars['ISO8601DateTime']>
  lastPlayedUntil?: Maybe<Scalars['ISO8601DateTime']>
  oldest?: Maybe<Scalars['Boolean']>
}

export type MapResultsArgs = {
  username: Scalars['String']
}

export type MapList = Pageable & {
  __typename?: 'MapList'
  nodes: Array<Map>
  totalCount: Scalars['Int']
}

export type Music = {
  __typename?: 'Music'
  artist: Scalars['String']
  genre: Scalars['String']
  id: Scalars['ID']
  map?: Maybe<Map>
  maps: Array<Map>
  number: Scalars['Int']
  series: Scalars['Int']
  textageUid: Scalars['String']
  title: Scalars['String']
}

export type MusicMapArgs = {
  playStyle: PlayStyle
  difficulty: Difficulty
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser?: Maybe<CreateUserPayload>
  registerResultsWithCSV?: Maybe<RegisterResultsWithCsvPayload>
}

export type MutationCreateUserArgs = {
  username: Scalars['String']
  displayName?: Maybe<Scalars['String']>
}

export type MutationRegisterResultsWithCsvArgs = {
  csv: Scalars['String']
  playStyle: PlayStyle
}

export type Pageable = {
  totalCount: Scalars['Int']
}

export enum PlayStyle {
  /** SP */
  Sp = 'SP',
  /** DP */
  Dp = 'DP',
}

export type Query = {
  __typename?: 'Query'
  /** Find maps. */
  maps?: Maybe<Array<Map>>
  /** Find a music. */
  music?: Maybe<Music>
  /** Find musics. */
  musics?: Maybe<Array<Music>>
  /** Search maps. */
  searchMaps: MapList
  updatedResults: ResultList
  /** Find a user by name. */
  user?: Maybe<User>
  /** The currently authenticated user. */
  viewer?: Maybe<User>
}

export type QueryMusicArgs = {
  number: Scalars['Int']
}

export type QuerySearchMapsArgs = {
  username: Scalars['String']
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  title?: Maybe<Scalars['String']>
  levels?: Maybe<Array<Maybe<Scalars['Int']>>>
  playStyle?: Maybe<PlayStyle>
  difficulties?: Maybe<Array<Maybe<Difficulty>>>
  updated?: Maybe<UpdatedResultFilter>
  grades?: Maybe<Array<Grade>>
}

export type QueryUpdatedResultsArgs = {
  username: Scalars['String']
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  baseDatetime?: Maybe<Scalars['ISO8601DateTime']>
  targetDatetime: Scalars['ISO8601DateTime']
}

export type QueryUserArgs = {
  name: Scalars['String']
}

/** Autogenerated return type of RegisterResultsWithCSV */
export type RegisterResultsWithCsvPayload = {
  __typename?: 'RegisterResultsWithCSVPayload'
  success: Scalars['Boolean']
}

export type Result = {
  __typename?: 'Result'
  bpi?: Maybe<Scalars['Float']>
  clearLamp?: Maybe<ClearLamp>
  gradeDiff: GradeDiff
  id: Scalars['ID']
  lastPlayedAt: Scalars['ISO8601DateTime']
  map: Map
  missCount?: Maybe<Scalars['Int']>
  nearestGradeDiff: GradeDiff
  nextGradeDiff: GradeDiff
  score?: Maybe<Scalars['Int']>
  scoreRate?: Maybe<Scalars['Float']>
  user: User
}

export type ResultList = Pageable & {
  __typename?: 'ResultList'
  nodes: Array<Result>
  totalCount: Scalars['Int']
}

export type UpdatedResultFilter = {
  baseDatetime?: Maybe<Scalars['ISO8601DateTime']>
  targetDatetime: Scalars['ISO8601DateTime']
}

export type User = {
  __typename?: 'User'
  countByEachLevelAndGrade: Array<LevelGradeCount>
  id: Scalars['ID']
  name: Scalars['String']
  profile: UserProfile
}

export type UserCountByEachLevelAndGradeArgs = {
  playStyle: PlayStyle
}

export type UserProfile = {
  __typename?: 'UserProfile'
  displayName: Scalars['String']
  id: Scalars['ID']
}

export type FetchStatsQueryVariables = {
  username: Scalars['String']
  playStyle: PlayStyle
}

export type FetchStatsQuery = { __typename?: 'Query' } & {
  user: Maybe<
    { __typename?: 'User' } & {
      countByEachLevelAndGrade: Array<
        { __typename?: 'LevelGradeCount' } & Pick<
          LevelGradeCount,
          'grade' | 'level' | 'count'
        >
      >
    }
  >
}

export type FindMapQueryVariables = {
  musicNumber: Scalars['Int']
  playStyle: PlayStyle
  difficulty: Difficulty
  username: Scalars['String']
  comparisonDateTime?: Maybe<Scalars['ISO8601DateTime']>
}

export type FindMapQuery = { __typename?: 'Query' } & {
  music: Maybe<
    { __typename?: 'Music' } & Pick<
      Music,
      'id' | 'number' | 'title' | 'genre' | 'artist' | 'textageUid' | 'series'
    > & {
        map: Maybe<
          { __typename?: 'Map' } & Pick<
            Map,
            | 'id'
            | 'numNotes'
            | 'level'
            | 'playStyle'
            | 'difficulty'
            | 'minBpm'
            | 'maxBpm'
          > & {
              result: Maybe<
                { __typename?: 'Result' } & Pick<
                  Result,
                  | 'id'
                  | 'score'
                  | 'missCount'
                  | 'clearLamp'
                  | 'scoreRate'
                  | 'bpi'
                  | 'lastPlayedAt'
                > & {
                    gradeDiff: { __typename?: 'GradeDiff' } & Pick<
                      GradeDiff,
                      'grade'
                    >
                    nearestGradeDiff: { __typename?: 'GradeDiff' } & Pick<
                      GradeDiff,
                      'grade' | 'diff'
                    >
                  }
              >
              oldResult: Maybe<
                { __typename?: 'Result' } & Pick<
                  Result,
                  | 'id'
                  | 'score'
                  | 'missCount'
                  | 'clearLamp'
                  | 'scoreRate'
                  | 'bpi'
                  | 'lastPlayedAt'
                >
              >
              results: Array<
                { __typename?: 'Result' } & Pick<
                  Result,
                  'id' | 'score' | 'scoreRate' | 'lastPlayedAt'
                >
              >
            }
        >
      }
  >
}

export type FindUserQueryVariables = {
  screenName: Scalars['String']
}

export type FindUserQuery = { __typename?: 'Query' } & {
  user: Maybe<{ __typename: 'User' } & Pick<User, 'name'>>
}

export type GetUserResultsQueryVariables = {
  username: Scalars['String']
  title?: Maybe<Scalars['String']>
  levels?: Maybe<Array<Maybe<Scalars['Int']>>>
  playStyle?: Maybe<PlayStyle>
  difficulties?: Maybe<Array<Maybe<Difficulty>>>
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  grades?: Maybe<Array<Grade>>
  comparisonTargetDateTime: Scalars['ISO8601DateTime']
  comparisonBaseDateTime?: Maybe<Scalars['ISO8601DateTime']>
  updated?: Maybe<UpdatedResultFilter>
}

export type GetUserResultsQuery = { __typename?: 'Query' } & {
  searchMaps: { __typename?: 'MapList' } & Pick<MapList, 'totalCount'> & {
      nodes: Array<
        { __typename?: 'Map' } & Pick<
          Map,
          'id' | 'numNotes' | 'level' | 'difficulty' | 'playStyle'
        > & {
            music: { __typename?: 'Music' } & Pick<
              Music,
              'id' | 'number' | 'title'
            >
            result: Maybe<
              { __typename?: 'Result' } & Pick<
                Result,
                | 'id'
                | 'score'
                | 'missCount'
                | 'clearLamp'
                | 'scoreRate'
                | 'bpi'
                | 'lastPlayedAt'
              > & {
                  gradeDiff: { __typename?: 'GradeDiff' } & Pick<
                    GradeDiff,
                    'grade'
                  >
                  nearestGradeDiff: { __typename?: 'GradeDiff' } & Pick<
                    GradeDiff,
                    'grade' | 'diff'
                  >
                }
            >
            oldResult: Maybe<
              { __typename?: 'Result' } & Pick<
                Result,
                | 'id'
                | 'score'
                | 'missCount'
                | 'clearLamp'
                | 'scoreRate'
                | 'bpi'
                | 'lastPlayedAt'
              >
            >
          }
      >
    }
}

export type GetViewerQueryVariables = {}

export type GetViewerQuery = { __typename?: 'Query' } & {
  viewer: Maybe<{ __typename: 'User' } & Pick<User, 'id' | 'name'>>
}

export type RegisterMutationVariables = {
  username: Scalars['String']
  displayName?: Maybe<Scalars['String']>
}

export type RegisterMutation = { __typename?: 'Mutation' } & {
  createUser: Maybe<
    { __typename?: 'CreateUserPayload' } & {
      user: { __typename?: 'User' } & Pick<User, 'name'> & {
          profile: { __typename?: 'UserProfile' } & Pick<
            UserProfile,
            'displayName'
          >
        }
    }
  >
}

export type RegisterResultsWithCsvMutationVariables = {
  csv: Scalars['String']
  playStyle: PlayStyle
}

export type RegisterResultsWithCsvMutation = { __typename?: 'Mutation' } & {
  registerResultsWithCSV: Maybe<
    { __typename?: 'RegisterResultsWithCSVPayload' } & Pick<
      RegisterResultsWithCsvPayload,
      'success'
    >
  >
}

export const FetchStatsDocument = gql`
  query fetchStats($username: String!, $playStyle: PlayStyle!) {
    user(name: $username) {
      countByEachLevelAndGrade(playStyle: $playStyle) {
        grade
        level
        count
      }
    }
  }
`
export type FetchStatsProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<FetchStatsQuery, FetchStatsQueryVariables>
  | TChildProps
export function withFetchStats<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FetchStatsQuery,
    FetchStatsQueryVariables,
    FetchStatsProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FetchStatsQuery,
    FetchStatsQueryVariables,
    FetchStatsProps<TChildProps>
  >(FetchStatsDocument, {
    alias: 'fetchStats',
    ...operationOptions,
  })
}

/**
 * __useFetchStatsQuery__
 *
 * To run a query within a React component, call `useFetchStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchStatsQuery({
 *   variables: {
 *      username: // value for 'username'
 *      playStyle: // value for 'playStyle'
 *   },
 * });
 */
export function useFetchStatsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FetchStatsQuery,
    FetchStatsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<FetchStatsQuery, FetchStatsQueryVariables>(
    FetchStatsDocument,
    baseOptions,
  )
}
export function useFetchStatsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FetchStatsQuery,
    FetchStatsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    FetchStatsQuery,
    FetchStatsQueryVariables
  >(FetchStatsDocument, baseOptions)
}
export type FetchStatsQueryHookResult = ReturnType<typeof useFetchStatsQuery>
export type FetchStatsLazyQueryHookResult = ReturnType<
  typeof useFetchStatsLazyQuery
>
export type FetchStatsQueryResult = ApolloReactCommon.QueryResult<
  FetchStatsQuery,
  FetchStatsQueryVariables
>
export const FindMapDocument = gql`
  query findMap(
    $musicNumber: Int!
    $playStyle: PlayStyle!
    $difficulty: Difficulty!
    $username: String!
    $comparisonDateTime: ISO8601DateTime
  ) {
    music(number: $musicNumber) {
      id
      number
      title
      genre
      artist
      textageUid
      series
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
          scoreRate
          gradeDiff {
            grade
          }
          nearestGradeDiff {
            grade
            diff
          }
          bpi
          lastPlayedAt
        }
        oldResult: result(
          username: $username
          lastPlayedUntil: $comparisonDateTime
        ) {
          id
          score
          missCount
          clearLamp
          scoreRate
          bpi
          lastPlayedAt
        }
        results(username: $username) {
          id
          score
          scoreRate
          lastPlayedAt
        }
      }
    }
  }
`
export type FindMapProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<FindMapQuery, FindMapQueryVariables>
  | TChildProps
export function withFindMap<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindMapQuery,
    FindMapQueryVariables,
    FindMapProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindMapQuery,
    FindMapQueryVariables,
    FindMapProps<TChildProps>
  >(FindMapDocument, {
    alias: 'findMap',
    ...operationOptions,
  })
}

/**
 * __useFindMapQuery__
 *
 * To run a query within a React component, call `useFindMapQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMapQuery({
 *   variables: {
 *      musicNumber: // value for 'musicNumber'
 *      playStyle: // value for 'playStyle'
 *      difficulty: // value for 'difficulty'
 *      username: // value for 'username'
 *      comparisonDateTime: // value for 'comparisonDateTime'
 *   },
 * });
 */
export function useFindMapQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FindMapQuery,
    FindMapQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<FindMapQuery, FindMapQueryVariables>(
    FindMapDocument,
    baseOptions,
  )
}
export function useFindMapLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FindMapQuery,
    FindMapQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<FindMapQuery, FindMapQueryVariables>(
    FindMapDocument,
    baseOptions,
  )
}
export type FindMapQueryHookResult = ReturnType<typeof useFindMapQuery>
export type FindMapLazyQueryHookResult = ReturnType<typeof useFindMapLazyQuery>
export type FindMapQueryResult = ApolloReactCommon.QueryResult<
  FindMapQuery,
  FindMapQueryVariables
>
export const FindUserDocument = gql`
  query findUser($screenName: String!) {
    user(name: $screenName) {
      __typename
      name
    }
  }
`
export type FindUserProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<FindUserQuery, FindUserQueryVariables>
  | TChildProps
export function withFindUser<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindUserQuery,
    FindUserQueryVariables,
    FindUserProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindUserQuery,
    FindUserQueryVariables,
    FindUserProps<TChildProps>
  >(FindUserDocument, {
    alias: 'findUser',
    ...operationOptions,
  })
}

/**
 * __useFindUserQuery__
 *
 * To run a query within a React component, call `useFindUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserQuery({
 *   variables: {
 *      screenName: // value for 'screenName'
 *   },
 * });
 */
export function useFindUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FindUserQuery,
    FindUserQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<FindUserQuery, FindUserQueryVariables>(
    FindUserDocument,
    baseOptions,
  )
}
export function useFindUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FindUserQuery,
    FindUserQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<FindUserQuery, FindUserQueryVariables>(
    FindUserDocument,
    baseOptions,
  )
}
export type FindUserQueryHookResult = ReturnType<typeof useFindUserQuery>
export type FindUserLazyQueryHookResult = ReturnType<
  typeof useFindUserLazyQuery
>
export type FindUserQueryResult = ApolloReactCommon.QueryResult<
  FindUserQuery,
  FindUserQueryVariables
>
export const GetUserResultsDocument = gql`
  query getUserResults(
    $username: String!
    $title: String
    $levels: [Int]
    $playStyle: PlayStyle
    $difficulties: [Difficulty]
    $offset: Int
    $limit: Int
    $grades: [Grade!]
    $comparisonTargetDateTime: ISO8601DateTime!
    $comparisonBaseDateTime: ISO8601DateTime
    $updated: UpdatedResultFilter
  ) {
    searchMaps(
      title: $title
      levels: $levels
      playStyle: $playStyle
      difficulties: $difficulties
      offset: $offset
      limit: $limit
      grades: $grades
      username: $username
      updated: $updated
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
          number
          title
        }
        result(username: $username, lastPlayedUntil: $comparisonBaseDateTime) {
          id
          score
          missCount
          clearLamp
          scoreRate
          bpi
          lastPlayedAt
          gradeDiff {
            grade
          }
          nearestGradeDiff {
            grade
            diff
          }
        }
        oldResult: result(
          username: $username
          lastPlayedUntil: $comparisonTargetDateTime
        ) {
          id
          score
          missCount
          clearLamp
          scoreRate
          bpi
          lastPlayedAt
        }
      }
    }
  }
`
export type GetUserResultsProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<GetUserResultsQuery, GetUserResultsQueryVariables>
  | TChildProps
export function withGetUserResults<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetUserResultsQuery,
    GetUserResultsQueryVariables,
    GetUserResultsProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetUserResultsQuery,
    GetUserResultsQueryVariables,
    GetUserResultsProps<TChildProps>
  >(GetUserResultsDocument, {
    alias: 'getUserResults',
    ...operationOptions,
  })
}

/**
 * __useGetUserResultsQuery__
 *
 * To run a query within a React component, call `useGetUserResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserResultsQuery({
 *   variables: {
 *      username: // value for 'username'
 *      title: // value for 'title'
 *      levels: // value for 'levels'
 *      playStyle: // value for 'playStyle'
 *      difficulties: // value for 'difficulties'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      grades: // value for 'grades'
 *      comparisonTargetDateTime: // value for 'comparisonTargetDateTime'
 *      comparisonBaseDateTime: // value for 'comparisonBaseDateTime'
 *      updated: // value for 'updated'
 *   },
 * });
 */
export function useGetUserResultsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUserResultsQuery,
    GetUserResultsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetUserResultsQuery,
    GetUserResultsQueryVariables
  >(GetUserResultsDocument, baseOptions)
}
export function useGetUserResultsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserResultsQuery,
    GetUserResultsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetUserResultsQuery,
    GetUserResultsQueryVariables
  >(GetUserResultsDocument, baseOptions)
}
export type GetUserResultsQueryHookResult = ReturnType<
  typeof useGetUserResultsQuery
>
export type GetUserResultsLazyQueryHookResult = ReturnType<
  typeof useGetUserResultsLazyQuery
>
export type GetUserResultsQueryResult = ApolloReactCommon.QueryResult<
  GetUserResultsQuery,
  GetUserResultsQueryVariables
>
export const GetViewerDocument = gql`
  query getViewer {
    viewer {
      __typename
      id
      name
    }
  }
`
export type GetViewerProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<GetViewerQuery, GetViewerQueryVariables>
  | TChildProps
export function withGetViewer<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetViewerQuery,
    GetViewerQueryVariables,
    GetViewerProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetViewerQuery,
    GetViewerQueryVariables,
    GetViewerProps<TChildProps>
  >(GetViewerDocument, {
    alias: 'getViewer',
    ...operationOptions,
  })
}

/**
 * __useGetViewerQuery__
 *
 * To run a query within a React component, call `useGetViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetViewerQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetViewerQuery,
    GetViewerQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetViewerQuery, GetViewerQueryVariables>(
    GetViewerDocument,
    baseOptions,
  )
}
export function useGetViewerLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetViewerQuery,
    GetViewerQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetViewerQuery, GetViewerQueryVariables>(
    GetViewerDocument,
    baseOptions,
  )
}
export type GetViewerQueryHookResult = ReturnType<typeof useGetViewerQuery>
export type GetViewerLazyQueryHookResult = ReturnType<
  typeof useGetViewerLazyQuery
>
export type GetViewerQueryResult = ApolloReactCommon.QueryResult<
  GetViewerQuery,
  GetViewerQueryVariables
>
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
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>
export type RegisterProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<RegisterMutation, RegisterMutationVariables>
  | TChildProps
export function withRegister<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, {
    alias: 'register',
    ...operationOptions,
  })
}

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      displayName: // value for 'displayName'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = ApolloReactCommon.MutationResult<
  RegisterMutation
>
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const RegisterResultsWithCsvDocument = gql`
  mutation registerResultsWithCSV($csv: String!, $playStyle: PlayStyle!) {
    registerResultsWithCSV(csv: $csv, playStyle: $playStyle) {
      success
    }
  }
`
export type RegisterResultsWithCsvMutationFn = ApolloReactCommon.MutationFunction<
  RegisterResultsWithCsvMutation,
  RegisterResultsWithCsvMutationVariables
>
export type RegisterResultsWithCsvProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      RegisterResultsWithCsvMutation,
      RegisterResultsWithCsvMutationVariables
    >
  | TChildProps
export function withRegisterResultsWithCsv<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RegisterResultsWithCsvMutation,
    RegisterResultsWithCsvMutationVariables,
    RegisterResultsWithCsvProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RegisterResultsWithCsvMutation,
    RegisterResultsWithCsvMutationVariables,
    RegisterResultsWithCsvProps<TChildProps>
  >(RegisterResultsWithCsvDocument, {
    alias: 'registerResultsWithCsv',
    ...operationOptions,
  })
}

/**
 * __useRegisterResultsWithCsvMutation__
 *
 * To run a mutation, you first call `useRegisterResultsWithCsvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterResultsWithCsvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerResultsWithCsvMutation, { data, loading, error }] = useRegisterResultsWithCsvMutation({
 *   variables: {
 *      csv: // value for 'csv'
 *      playStyle: // value for 'playStyle'
 *   },
 * });
 */
export function useRegisterResultsWithCsvMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterResultsWithCsvMutation,
    RegisterResultsWithCsvMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RegisterResultsWithCsvMutation,
    RegisterResultsWithCsvMutationVariables
  >(RegisterResultsWithCsvDocument, baseOptions)
}
export type RegisterResultsWithCsvMutationHookResult = ReturnType<
  typeof useRegisterResultsWithCsvMutation
>
export type RegisterResultsWithCsvMutationResult = ApolloReactCommon.MutationResult<
  RegisterResultsWithCsvMutation
>
export type RegisterResultsWithCsvMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterResultsWithCsvMutation,
  RegisterResultsWithCsvMutationVariables
>
