# frozen_string_literal: true

module CSVImportable
  extend ActiveSupport::Concern

  # @param csv [String]
  # @param play_style [:sp, :dp]
  def import_results_from_csv(csv, play_style)
    table = IIDXIO::CSVParser.parse(csv)

    ApplicationRecord.transaction do
      result_batch = result_batches.create

      table.rows.each_slice(1000) do |rows|
        music_ids = Music.where(csv_title: rows.map(&:title)).pluck(:csv_title, :id).to_h

        # Map#id => { Music#id, Music#difficulty }
        map_map =
          Map
          .where(play_style: play_style, music_id: music_ids.values)
          .pluck(:id, :music_id, :difficulty)
          .map { |id, music_id, difficulty| [id, { music_id: music_id, difficulty: difficulty }] }
          .to_h

        # Music#id => { Map#difficulty => Map#id }
        map_ids = {}.tap do |h|
          map_map.each do |map_id, map|
            (h[map[:music_id]] ||= {})[map[:difficulty].to_sym] = map_id
          end
        end

        result_map = results.where(map_id: map_map.keys).group_by { |r| map_map.dig(r.map_id, :music_id) }

        rows.each do |row|
          music_id = music_ids[row.title]

          current_results =
            if music_id.nil? || !result_map.key?(music_id)
              {}
            else
              rs = result_map[music_id]
              rs.map { |r| map_map.dig(r.map_id, :difficulty).to_sym }.zip(rs).to_h
            end

          import_from_row(
            music_id,
            map_ids[music_id] || {},
            current_results,
            play_style,
            row,
            result_batch,
          )
        end
      end
    end
  end

  private

  # @param music_id [Integer, nil]
  # @param map_ids [{(:normal, :hyper, :another) => Integer}>]
  # @param current_results [{(:normal, :hyper, :another) => Result}>]
  # @param play_style [:sp, :dp]
  # @param row [IIDXIO::CSVParser::Row]
  # @param result_batch [ResultBatch]
  def import_from_row(music_id, map_ids, current_results, play_style, row, result_batch)
    %i[normal hyper another].each do |difficulty|
      row_map = row.public_send(difficulty)
      next if row_map.no_data?

      map_id = map_ids[difficulty]

      result_attributes = {
        score: row_map.ex_score,
        miss_count: row_map.miss_count,
        clear_lamp: !row_map.clear_lamp.nil? ? Result.find_clear_lamp(row_map.clear_lamp) : nil,
        last_played_at: row.last_played_at,
        result_batch: result_batch,
      }

      if music_id && map_id
        create_result(
          map_id: map_id,
          current_result: current_results[difficulty],
          **result_attributes,
        )
      else
        insert_temporary_result(
          row: row,
          row_map: row_map,
          difficulty: difficulty,
          play_style: play_style,
          **result_attributes,
        )
      end
    end
  end

  # @param map_id [Integer]
  # @param current_result [Result, nil]
  def create_result(map_id:, current_result:, **result_attributes)
    new_result = Result.new(map_id: map_id, **result_attributes)

    return insert_new_result(new_result) if current_result.nil?

    return if current_result.last_played_at >= new_result.last_played_at

    is_updated = current_result.updated?(new_result)

    current_result.update!(**result_attributes)
    return unless is_updated

    insert_result_log(current_result)
  end

  # @param new_result [Result]
  def insert_new_result(new_result)
    results << new_result

    insert_result_log(new_result)
  end

  # @param result [Result]
  def insert_result_log(result)
    result.user = self
    result.to_log.save!
  end

  # @param row [IIDXIO::CSVParser::Row]
  # @param row_map [IIDXIO::CSVParser::Row::Map]
  # @param difficulty [:normal, :hyper, :another]
  # @param play_style [:sp, :dp]
  def insert_temporary_result(row:, row_map:, difficulty:, play_style:, **result_attributes)
    temporary_results << TemporaryResult.new(
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
