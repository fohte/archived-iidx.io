# frozen_string_literal: true

module Types
  module Enum
    class ClearLamp < Base
      value 'FAILED', description: 'Failed'
      value 'ASSIST', description: 'Assist Clear'
      value 'EASY', description: 'Easy Clear'
      value 'NORMAL', description: 'Clear'
      value 'HARD', description: 'Hard Clear'
      value 'EX_HARD', description: 'EX Hard Clear'
      value 'FULL_COMBO', description: 'FullCombo Clear'
    end
  end
end
