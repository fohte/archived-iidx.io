# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class SubTitleIsolationFilter < BaseFilter
      PAIRS = [
        %w[- -],
        %w[( )],
        %w|[ ]|,

        # wave dash
        %W[\u{301c} \u{301c}],

        # fullwidth tilde
        %W[\u{ff5e} \u{ff5e}],
      ].freeze

      LEGGENDARIA_PATTERN = Regexp.union('†', '†LEGGENDARIA').freeze
      PAIRS_PATTERN = Regexp.union(PAIRS.map do |left, right|
        /#{Regexp.quote(left)}.*#{Regexp.quote(right)}/
      end).freeze

      PATTERN = /\s*(#{PAIRS_PATTERN}(?:#{LEGGENDARIA_PATTERN})?)$/.freeze

      def call(str)
        str.gsub(PATTERN, ' \1')
      end
    end
  end
end
