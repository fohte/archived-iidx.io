# frozen_string_literal: true

module GradeEnum
  extend ActiveSupport::Concern

  GradeDiff = Struct.new(:grade, :diff)

  GRADE = {
    max: 'MAX',
    aaa: 'AAA',
    aa: 'AA',
    a: 'A',
    b: 'B',
    c: 'C',
    d: 'D',
    e: 'E',
    f: 'F',
  }.freeze

  # @return [GradeDiff]
  def grade_diff
    return GradeDiff.new(GRADE[:f], 0) if score.nil?
    return GradeDiff.new(GRADE[:max], 0) if score >= map.max_score

    grade, diff =
      GRADE
      .keys
      .map { |g| [g, calc_grade_diff(g)] }
      .filter { |_, d| d >= 0 }
      .min_by { |_, d| d.abs }

    GradeDiff.new(GRADE[grade], diff)
  end

  # @return [GradeDiff]
  def next_grade_diff
    return GradeDiff.new(GRADE[:f], 0) if score.nil?
    return GradeDiff.new(GRADE[:max], 0) if score >= map.max_score

    grade, diff =
      GRADE
      .keys
      .reject { |g| g == GRADE[:f] }
      .map { |g| [g, calc_grade_diff(g)] }
      .filter { |_, d| d < 0 }
      .min_by { |_, d| d.abs }

    GradeDiff.new(GRADE[grade], diff)
  end

  # @return [GradeDiff]
  def nearest_grade_diff
    return GradeDiff.new(GRADE[:f], 0) if score.nil?
    return GradeDiff.new(GRADE[:max], 0) if score >= map.max_score

    current_gd = grade_diff
    next_gd = next_grade_diff

    return current_gd if current_gd.diff < -next_gd.diff

    next_gd
  end

  private

  def calc_grade_diff(grade)
    score - grade_borders[grade]
  end

  def grade_borders
    @grade_borders ||= {
      max: map.max_score,
      aaa: calc_grade_border(8.fdiv(9)),
      aa: calc_grade_border(7.fdiv(9)),
      a: calc_grade_border(6.fdiv(9)),
      b: calc_grade_border(5.fdiv(9)),
      c: calc_grade_border(4.fdiv(9)),
      d: calc_grade_border(3.fdiv(9)),
      e: calc_grade_border(2.fdiv(9)),
      f: 0,
    }
  end

  # @param coefficients [Float]
  # @return [Integer]
  def calc_grade_border(coefficients)
    (map.max_score * coefficients).ceil
  end
end
