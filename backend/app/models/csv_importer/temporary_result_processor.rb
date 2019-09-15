# frozen_string_literal: true

module CSVImporter
  class TemporaryResultProcessor
    # @return [CSVImporter::ResultProp]
    attr_reader :result_prop

    def initialize(result_prop)
      @result_prop = result_prop
    end

    delegate(
      :row,
      :row_map,
      :play_style,
      :difficulty,
      :result_attributes,
      to: :result_prop,
    )

    # @param store [CSVImporter::ResultStore]
    def store_result(store)
      store.temporary_results << TemporaryResult.new(
        version: row.version,
        title: row.title,
        genre: row.genre,
        artist: row.artist,
        level: row_map.level,
        play_style: play_style,
        difficulty: difficulty,
        **result_attributes,
      )
    end
  end
end
