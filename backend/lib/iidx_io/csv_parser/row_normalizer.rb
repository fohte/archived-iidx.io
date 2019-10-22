# frozen_string_literal: true

module IIDXIO
  module CSVParser
    class RowNormalizer
      attr_reader :raw_rows

      def initialize(raw_rows)
        @raw_rows = raw_rows
      end

      def normalize
        return raw_rows if row_class == Row::FiveDifficulties

        raw_rows.group_by(&:title).each_value.map { |rows| rows.reduce(:merge) }
      end
    end
  end
end
