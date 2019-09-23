# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class SpaceBeforeLeggendariaDeletionFilter < BaseFilter
      LEGGENDARIA_PATTERN = /\s*(†LEGGENDARIA)$/.freeze

      def call(str)
        str.gsub(LEGGENDARIA_PATTERN, '\1')
      end
    end
  end
end
