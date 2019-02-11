# frozen_string_literal: true

module Types
  module Object
    class ResultType < Base
      field :id, ID, null: false
      field :map, MapType, null: false
      field :score, Integer, null: false
      field :miss_count, Integer, null: false

      field :clear_lamp, Enum::ClearLamp, null: false

      def clear_lamp
        object.clear_lamp.to_s.upcase
      end

      field :grade, Enum::Grade, null: false

      def grade
        object.grade.to_s.upcase
      end
    end
  end
end
