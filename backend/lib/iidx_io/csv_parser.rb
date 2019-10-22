# frozen_string_literal: true

module IIDXIO
  module CSVParser
    class << self
      # @param csv [String]
      # @param series [:heroic_verse, :rootage]
      # @return [CSVParser::Table]
      def parse(csv, series:)
        CSVParser::Table.new(csv, series: series)
      end
    end
  end
end
