# frozen_string_literal: true

module GradeEnum
  extend ActiveSupport::Concern

  included do
    enumerize :grade, in: %w[
      AAA
      AA
      A
      B
      C
      D
      E
      F
    ]
  end

  def find_grade
    return if score.nil?

    g = grade_diff.grade
    return 'AAA' if g == GradeDiff::GRADE[:max]

    g
  end
end
