# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class BaseFilter
      attr_reader :options

      def initialize(**opts)
        parse_options(**opts)
      end

      def call(_str)
        raise ::NotImplementedError
      end

      private

      def parse_options(**opts); end
    end
  end
end
