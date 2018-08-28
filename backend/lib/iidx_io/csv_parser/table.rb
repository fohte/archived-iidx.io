# frozen_string_literal: true

module IIDXIO
  module CSVParser
    class Table
      class << self
        # @param csv [String]
        # @return [self]
        def from_csv(csv)
          new(parse_csv(csv))
        end

        private

        # @param csv [String]
        # @return [Array<CSVParser::Row>]
        def parse_csv(csv)
          csv.lines[1..-1].map(&:strip!).map do |line|
            CSVParser::Row.from_csv(line)
          end
        end
      end

      attr_reader :rows

      # @param rows [Array<CSVParser::Row>]
      def initialize(rows)
        @rows = rows
      end
    end
  end
end
