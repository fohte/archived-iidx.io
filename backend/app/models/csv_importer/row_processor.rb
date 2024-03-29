# frozen_string_literal: true

module CSVImporter
  class RowProcessor
    # @return [CSVImporter::ResultCollection]
    attr_reader :results

    # @return [:sp, :dp]
    attr_reader :play_style

    # @return [IIDXIO::CSVParser::Row]
    attr_reader :row

    # @return [ResultBatch]
    attr_reader :result_batch

    def initialize(results:, play_style:, row:, result_batch:, series:)
      @results = results
      @play_style = play_style
      @row = row
      @result_batch = result_batch
      @series = series
    end

    delegate :maps, :user, to: :results
    delegate :musics, to: :maps

    # @param store [CSVImporter::ResultStore]
    def store_results(store)
      %i[beginner normal hyper another leggendaria].each do |difficulty|
        result_prop = ResultProp.new(
          user: user,
          map_id: maps.find_by_music_id(music_id)[difficulty],
          current_result: current_results[difficulty],
          play_style: play_style,
          difficulty: difficulty,
          row: row,
          result_batch: result_batch,
          series: @series,
        )

        map_processor = MapProcessor.new(result_prop: result_prop)

        map_processor.store_result(store)
      end
    end

    private

    def music_id
      @music_id ||= musics.find_id_by_title(row.title)
    end

    def current_results
      @current_results ||= results.find_by_music_id(music_id)
    end
  end
end
