# frozen_string_literal: true

module Types
  module Enum
    class Difficulty < Base
      value 'BEGINNER', description: 'Beginner'
      value 'NORMAL', description: 'Normal'
      value 'HYPER', description: 'Hyper'
      value 'ANOTHER', description: 'Another'
      value 'LEGGENDARIA', description: 'Leggendaria'
    end
  end
end
