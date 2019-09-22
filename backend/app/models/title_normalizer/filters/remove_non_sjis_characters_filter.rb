# frozen_string_literal: true

module TitleNormalizer
  module Filters
    # remove the non Shift_JIS characters
    class RemoveNonSJISCharactersFilter < BaseFilter
      def call(str)
        str
          .encode('Shift_JIS', invalid: :replace, undef: :replace, replace: ' ')
          .encode('UTF-8')
      end
    end
  end
end
