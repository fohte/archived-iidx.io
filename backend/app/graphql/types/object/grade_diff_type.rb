# frozen_string_literal: true

module Types
  module Object
    class GradeDiffType < Base
      field :grade, Enum::GradeDiffGrade, null: false
      field :diff, Integer, null: false
    end
  end
end
