# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class SubTitleIsolationFilter < BaseFilter
      PATTERN = /\s*(\(.*\))$/.freeze

      def call(str)
        str.gsub(PATTERN, ' \1')
      end
    end
  end
end
