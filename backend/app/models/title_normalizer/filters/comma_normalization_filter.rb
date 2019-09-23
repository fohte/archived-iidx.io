# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class CommaNormalizationFilter < BaseFilter
      FULLWIDTH_COMMA = '，'
      HALFWIDTH_COMMA = ','

      def call(str)
        str.tr(source, target)
      end

      private

      def parse_options(target:)
        unless %i[halfwidth fullwidth].include?(target)
          raise ArgumentError,
                "Unknown target: #{target}"
        end

        @target = target
      end

      def source
        halfwidth_target? ? FULLWIDTH_COMMA : HALFWIDTH_COMMA
      end

      def target
        halfwidth_target? ? HALFWIDTH_COMMA : FULLWIDTH_COMMA
      end

      def halfwidth_target?
        @target == :halfwidth
      end
    end
  end
end
