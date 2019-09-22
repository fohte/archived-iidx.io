# frozen_string_literal: true

module IIDXIO
  module CSVParser
    class Table
      # @erutrn csv [String]
      attr_reader :csv

      def initialize(csv)
        @csv = csv
      end

      # @return [Array<CSVParser::Row>]
      def rows
        @rows ||=
          csv.lines[1..].map(&:strip!).map do |line|
            CSVParser::Row.new(line)
          end
      end
    end
  end
end
