# frozen_string_literal: true

module Types
  module Object
    class ResultType < Base
      field :id, ID, null: false
      field :map, MapType, null: false
      field :score, Integer, null: true
      field :miss_count, Integer, null: true
      field :bpi, Float, null: true
      field :last_played_at, GraphQL::Types::ISO8601DateTime, null: false

      field :clear_lamp, Enum::ClearLamp, null: true

      def clear_lamp
        return nil if object.clear_lamp.nil?

        object.clear_lamp.to_s.upcase
      end

      field :grade, Enum::Grade, null: true

      def grade
        return nil if object.grade.nil?

        object.grade.to_s.upcase
      end
    end
  end
end
