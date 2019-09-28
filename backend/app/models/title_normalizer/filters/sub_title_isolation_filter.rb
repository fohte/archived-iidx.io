# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class SubTitleIsolationFilter < BaseFilter
      LEGGENDARIA_PATTERN = Regexp.union('†', '†LEGGENDARIA').freeze

      PATTERN = /\s*(\(.*\)(?:#{LEGGENDARIA_PATTERN})?)$/.freeze

      def call(str)
        str.gsub(PATTERN, ' \1')
      end
    end
  end
end
