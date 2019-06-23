# typed: strict
# frozen_string_literal: true

module Types
  module Enum
    class Difficulty < Base
      value 'NORMAL', description: 'Normal'
      value 'HYPER', description: 'Hyper'
      value 'ANOTHER', description: 'Another'
    end
  end
end
