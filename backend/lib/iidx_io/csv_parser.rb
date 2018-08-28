# frozen_string_literal: true

module IIDXIO
  module CSVParser
    class << self
      # @param csv [String]
      # @return [CSVParser::Table]
      def parse(csv)
        CSVParser::Table.from_csv(csv)
      end
    end
  end
end
