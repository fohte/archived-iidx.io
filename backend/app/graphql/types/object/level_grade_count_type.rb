# frozen_string_literal: true

module Types
  module Object
    class LevelGradeCountType < Base
      field :level, Integer, null: false, hash_key: :level
      field :grade, Enum::Grade, null: false, hash_key: :grade
      field :count, Integer, null: false, hash_key: :count
    end
  end
end
