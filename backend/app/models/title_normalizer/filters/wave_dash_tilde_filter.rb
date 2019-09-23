# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class WaveDashTildeFilter < BaseFilter
      WAVE_DASH = "\u{301c}"
      FULLWIDTH_TILDE = "\u{ff5e}"

      def call(str)
        str.tr(source, target)
      end

      private

      def parse_options(target:)
        unless %i[wave_dash tilde].include?(target)
          raise ArgumentError,
                "Unknown target: #{target}"
        end

        @target = target
      end

      def source
        wave_dash_target? ? FULLWIDTH_TILDE : WAVE_DASH
      end

      def target
        wave_dash_target? ? WAVE_DASH : FULLWIDTH_TILDE
      end

      def wave_dash_target?
        @target == :wave_dash
      end
    end
  end
end
