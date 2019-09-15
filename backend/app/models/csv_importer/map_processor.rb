# frozen_string_literal: true

module CSVImporter
  class MapProcessor
    # @return [CSVImporter::ResultProp]
    attr_reader :result_prop

    def initialize(result_prop:)
      @result_prop = result_prop
    end

    delegate :row_map, :map_id, to: :result_prop

    def import_result
      return if row_map.no_data?

      if map_id
        ResultProcessor.new(result_prop).import
      else
        TemporaryResultProcessor.new(result_prop).import
      end
    end
  end
end
