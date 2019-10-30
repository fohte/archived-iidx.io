# frozen_string_literal: true

module IIDXIO
  module CSVParser
    class Table
      # @return [String]
      attr_reader :csv

      # @param csv [String]
      # @param series [:heroic_verse, :rootage]
      def initialize(csv, series:)
        @csv = csv
        @series = series
      end

      def row_class
        @row_class ||=
          case @series
          when :rootage then Row::ThreeDifficulties
          when :heroic_verse then Row::FiveDifficulties
          else
            raise "invalid series: #{@series}"
          end
      end

      # @return [Array<CSVParser::Row::Data>]
      def rows
        @rows ||=
          begin
            raw_rows = csv.lines[1..].map(&:strip!).map do |line|
              row_class.new(line).to_data
            end

            normalize_rows(raw_rows)
          end
      end

      private

      def normalize_rows(raw_rows)
        return raw_rows if row_class == Row::FiveDifficulties

        raw_rows.group_by(&:title).each_value.map do |rows|
          rows.reduce(:merge)
        end
      end
    end
  end
end
