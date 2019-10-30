# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class IrregularFilter < BaseFilter
      def initialize(irregular_maps)
        @irregular_maps = irregular_maps
      end

      def call(str)
        @irregular_maps[str] || str
      end
    end
  end
end
