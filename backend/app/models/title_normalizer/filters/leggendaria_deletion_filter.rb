# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class LeggendariaDeletionFilter < BaseFilter
      LEGGENDARIA_PATTERN = Regexp.union('†', '†LEGGENDARIA').freeze
      PATTERN = /(\s*#{LEGGENDARIA_PATTERN})$/.freeze

      def call(str)
        str.sub(PATTERN, '')
      end
    end
  end
end
