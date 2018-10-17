# frozen_string_literal: true

module GradeEnum
  extend ActiveSupport::Concern

  included do
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
  end

  class_methods do
    # @param str [String]
    # @return [Enumerize::Value]
    def find_grade(str)
      case str
      when 'A' then grade.a
      when 'AA' then grade.aa
      when 'AAA' then grade.aaa
      when 'B' then grade.b
      when 'C' then grade.c
      when 'D' then grade.d
      when 'E' then grade.e
      when 'F' then grade.f
      else
        raise IIDXIO::UnknownGradeError, "#{str} is unknown grade"
      end
    end
  end
end
