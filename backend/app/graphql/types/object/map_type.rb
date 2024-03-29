# frozen_string_literal: true

module Types
  module Object
    class MapType < Base
      field :id, resolver: Resolvers::ModelID

      field :music, MusicType, null: false, preload: :music

      field :num_notes, Integer, null: false
      field :level, Integer, null: false
      field :play_style, Enum::PlayStyle, null: false

      def play_style
        object.play_style.to_s.upcase
      end

      field :difficulty, Enum::Difficulty, null: false

      def difficulty
        object.difficulty.to_s.upcase
      end

      field :min_bpm, Integer, null: false
      field :max_bpm, Integer, null: false

      field :result, ResultType, null: true do
        argument :username, String, required: true
        argument :last_played_since, GraphQL::Types::ISO8601DateTime, required: false
        argument :last_played_until, GraphQL::Types::ISO8601DateTime, required: false
        argument :oldest, Boolean, required: false
      end

      def result(username:, last_played_since: nil, last_played_until: nil, oldest: false)
        LoaderUtils.find_by!(User, name: username) do |user|
          if last_played_since.nil? && last_played_until.nil? && !oldest
            scope = user.results.with_latest_series

            LoaderUtils.find_by(Result, { map_id: object.id }, scope: scope)
          else
            scope = user.result_logs.with_latest_series.snapshot_results(
              last_played_since: last_played_since,
              last_played_until: last_played_until,
              oldest: oldest,
            )

            LoaderUtils.find_all(ResultLog, { map_id: object.id }, scope: scope).then do |r|
              r&.first
            end
          end
        end
      end

      field :results, [ResultType], null: false do
        argument :username, String, required: true
      end

      def results(username:)
        LoaderUtils.find_by!(User, name: username) do |user|
          LoaderUtils.find_all(ResultLog, { map_id: object.id }, scope: user.result_logs.with_latest_series)
        end
      end
    end
  end
end
