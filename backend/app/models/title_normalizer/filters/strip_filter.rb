# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class StripFilter < BaseFilter
      def call(str)
        str.strip
      end
    end
  end
end
