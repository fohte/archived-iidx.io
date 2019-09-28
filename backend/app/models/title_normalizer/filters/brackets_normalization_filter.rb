# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class BracketsNormalizationFilter < BaseFilter
      PAIRS = [
        %w[- -],
        %w[( )],
        %w|[ ]|,

        # wave dash
        %W[\u{301c} \u{301c}],

        # fullwidth tilde
        %W[\u{ff5e} \u{ff5e}],
      ].freeze

      PAIR_PATTERNS = PAIRS.map do |left, right|
        /#{Regexp.quote(left)}(.*)#{Regexp.quote(right)}/
      end.freeze

      def call(str)
        PAIR_PATTERNS.each_with_object(+str) do |pattern, result|
          result.gsub!(pattern, '(\1)')
        end.freeze
      end
    end
  end
end
