# typed: false
# frozen_string_literal: true

module ClearLampEnum
  extend ActiveSupport::Concern

  included do
    enumerize :clear_lamp, in: {
      failed: 1,
      assist: 2,
      easy: 3,
      normal: 4,
      hard: 5,
      ex_hard: 6,
      full_combo: 7,
    }
  end

  class_methods do
    # @param str [String]
    # @return [Enumerize::Value]
    def find_clear_lamp(str)
      case str
      when 'FAILED' then clear_lamp.failed
      when 'ASSIST CLEAR' then clear_lamp.assist
      when 'EASY CLEAR' then clear_lamp.easy
      when 'CLEAR' then clear_lamp.normal
      when 'HARD CLEAR' then clear_lamp.hard
      when 'EX HARD CLEAR' then clear_lamp.ex_hard
      when 'FULLCOMBO CLEAR' then clear_lamp.full_combo
      else
        raise IIDXIO::UnknownClearLampError, "#{str} is unknown clear lamp"
      end
    end
  end
end
