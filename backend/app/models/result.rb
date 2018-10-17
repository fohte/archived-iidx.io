# frozen_string_literal: true

class Result < ApplicationRecord
  belongs_to :user
  belongs_to :map

  include ClearLampEnum
  include GradeEnum

  def updated?(result)
    clear_lamp.value < result.clear_lamp.value ||
      grade.value < result.grade.value ||
      score < result.score ||
      miss_count > result.miss_count
  end
end
