# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class SpaceBeforeLeggendariaDeletionFilter < BaseFilter
      PATTERN = /\s*(#{SubTitleIsolationFilter::LEGGENDARIA_PATTERN})$/.freeze

      def call(str)
        str.gsub(PATTERN, '\1')
      end
    end
  end
end
