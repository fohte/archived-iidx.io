# frozen_string_literal: true

module Types
  module Object
    class ResultType < Base
      field :id, resolver: Resolvers::ModelID

      field :user, UserType, null: false, preload: :user

      field :map, MapType, null: false, preload: :map

      field :score, Integer, null: true
      field :miss_count, Integer, null: true
      field :bpi, Float, null: true, preload: %i[map kaiden_average_result world_record_result]

      field :score_rate, Float, null: true, preload: :map

      field :last_played_at, GraphQL::Types::ISO8601DateTime, null: false

      field :clear_lamp, Enum::ClearLamp, null: true

      field :grade_diff, GradeDiffType, null: false, preload: :map
      field :next_grade_diff, GradeDiffType, null: false, preload: :map
      field :nearest_grade_diff, GradeDiffType, null: false, preload: :map

      def clear_lamp
        return nil if object.clear_lamp.nil?

        object.clear_lamp.to_s.upcase
      end
    end
  end
end
