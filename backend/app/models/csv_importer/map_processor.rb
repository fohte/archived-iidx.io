# frozen_string_literal: true

module CSVImporter
  class MapProcessor
    # @return [CSVImporter::ResultProp]
    attr_reader :result_prop

    def initialize(result_prop:)
      @result_prop = result_prop
    end

    delegate :row_map, :map_id, to: :result_prop

    # @param store [CSVImporter::ResultStore]
    def store_result(store)
      return if row_map.no_data?

      if map_id
        ResultProcessor.new(result_prop).store_result(store)
      else
        TemporaryResultProcessor.new(result_prop).store_result(store)
      end
    end
  end
end
