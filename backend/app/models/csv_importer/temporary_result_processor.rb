# frozen_string_literal: true

module CSVImporter
  class TemporaryResultProcessor
    # @return [CSVImporter::ResultProp]
    attr_reader :result_prop

    def initialize(result_prop)
      @result_prop = result_prop
    end

    delegate(
      :user,
      :row,
      :row_map,
      :play_style,
      :difficulty,
      :result_attributes,
      to: :result_prop,
    )

    def import
      user.temporary_results << TemporaryResult.new(
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
