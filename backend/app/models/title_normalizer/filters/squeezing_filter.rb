# frozen_string_literal: true

module TitleNormalizer
  module Filters
    # remove two or more consecutive whitespaces
    class SqueezingFilter < BaseFilter
      def call(str)
        str.squeeze(' ')
      end
    end
  end
end
