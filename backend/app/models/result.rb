# frozen_string_literal: true

class Result < ApplicationRecord
  belongs_to :user
  belongs_to :map
  belongs_to :result_batch, optional: true

  include ClearLampEnum
  include GradeEnum

  def updated?(other)
    clear_lamp_updated?(other.clear_lamp) ||
      grade_updated?(other.grade) ||
      score_updated?(other.score) ||
      miss_count_updated?(other.miss_count)
  end

  def clear_lamp_updated?(other)
    return false if other.nil?
    return true if clear_lamp.nil? && !other.nil?

    !clear_lamp.nil? && clear_lamp.value < other.value
  end

  def grade_updated?(other)
    return false if other.nil?
    return true if grade.nil? && !other.nil?

    !grade.nil? && grade.value < other.value
  end

  def score_updated?(other)
    return false if other.nil?
    return true if score.nil? && !other.nil?

    !score.nil? && score < other
  end

  def miss_count_updated?(other)
    return false if other.nil?
    return true if miss_count.nil? && !other.nil?

    !miss_count.nil? && miss_count > other
  end
end
