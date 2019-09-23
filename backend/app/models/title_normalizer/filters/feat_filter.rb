# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class FeatFilter < BaseFilter
      PATTERN = /(feat\.)\s*(.+)/.freeze

      def call(str)
        str.gsub(PATTERN, '\1 \2')
      end
    end
  end
end
