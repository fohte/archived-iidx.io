# frozen_string_literal: true

class Result < ApplicationRecord
  belongs_to :user
  belongs_to :map

  enumerize :clear_lamp, in: {
    failed: 1,
    assist: 2,
    easy: 3,
    normal: 4,
    hard: 5,
    ex_hard: 6,
    full_combo: 7,
  }

  enumerize :grade, in: {
    f: 1,
    e: 2,
    d: 3,
    c: 4,
    b: 5,
    a: 6,
    aa: 7,
    aaa: 8,
  }

  CLEAR_LAMP_MAP = {
    'FAILED' => clear_lamp.find_value(:failed),
    'ASSIST CLEAR' => clear_lamp.find_value(:assist),
    'EASY CLEAR' => clear_lamp.find_value(:easy),
    'CLEAR' => clear_lamp.find_value(:normal),
    'HARD CLEAR' => clear_lamp.find_value(:hard),
    'EX HARD CLEAR' => clear_lamp.find_value(:ex_hard),
    'FULLCOMBO CLEAR' => clear_lamp.find_value(:full_combo),
  }.freeze

  GRADE_MAP = {
    'A' => grade.find_value(:a),
    'AA' => grade.find_value(:aa),
    'AAA' => grade.find_value(:aaa),
    'B' => grade.find_value(:b),
    'C' => grade.find_value(:c),
    'D' => grade.find_value(:d),
    'E' => grade.find_value(:e),
    'F' => grade.find_value(:f),
  }.freeze

  class << self
    # @param str [String]
    # @return [Enumerize::Value]
    def find_clear_lamp(str)
      CLEAR_LAMP_MAP.fetch(str) do
        raise IIDXIO::UnknownClearLampError, "#{str} is unknown clear lamp"
      end
    end

    # @param str [String]
    # @return [Enumerize::Value]
    def find_grade(str)
      GRADE_MAP.fetch(str) do
        raise IIDXIO::UnknownGradeError, "#{str} is unknown grade"
      end
    end
  end
end
