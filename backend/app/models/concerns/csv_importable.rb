# frozen_string_literal: true

module CSVImportable
  extend ActiveSupport::Concern

  # @param csv [String]
  # @param play_style [:sp, :dp]
  # @param series [:heroic_verse, :rootage]
  def import_results_from_csv(csv, play_style, series: :heroic_verse)
    table = IIDXIO::CSVParser.parse(csv, series: series)

    ApplicationRecord.transaction do
      result_batch = result_batches.create
      result_store = CSVImporter::ResultStore.new

      table.rows.each_slice(1000) do |rows|
        musics = CSVImporter::MusicCollection.new(
          titles: rows.map(&:title),
        )
        maps = CSVImporter::MapCollection.new(
          play_style: play_style,
          musics: musics,
        )
        results = CSVImporter::ResultCollection.new(
          user: self,
          maps: maps,
        )

        rows.each do |row|
          row_processor = CSVImporter::RowProcessor.new(
            results: results,
            play_style: play_style,
            row: row,
            result_batch: result_batch,
            series: series,
          )

          row_processor.store_results(result_store)
        end
      end

      result_store.insert_all
    end
  end
end
