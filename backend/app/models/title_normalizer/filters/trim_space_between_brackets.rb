# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class TrimSpaceBetweenBrackets < BaseFilter
      PATTERN = /\(\s*(.+?)\s*\)/.freeze

      def call(str)
        str.gsub(PATTERN, '(\1)')
      end
    end
  end
end
