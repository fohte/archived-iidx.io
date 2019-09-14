# frozen_string_literal: true

class CSVImporter
  # @return [User]
  attr_reader :user

  # @return [String]
  attr_reader :csv

  # @return [:sp, :dp]
  attr_reader :play_style

  # @param user [User]
  # @param csv [String]
  # @param play_style [:sp, :dp]
  def initialize(user, csv, play_style)
    @user = user
    @csv = csv
    @play_style = play_style
  end

  def import
    table = IIDXIO::CSVParser.parse(csv)

    ApplicationRecord.transaction do
      result_batch = user.result_batches.create

      table.rows.each_slice(1000) do |rows|
        musics = Music.includes(:maps).where(
          csv_title: rows.map(&:title),
          maps: { play_style: play_style },
        )
        music_map = musics.map(&:csv_title).zip(musics).to_h

        maps = musics.flat_map(&:maps)
        map_map = maps.map(&:id).zip(maps).to_h

        results = user.results.where(map_id: map_map.keys)
        result_map = results.group_by { |r| map_map[r.map_id].music_id }

        rows.each do |row|
          music = music_map[row.title]

          current_results =
            if music.nil? || !result_map.key?(music.id)
              {}
            else
              rs = result_map[music.id]
              rs.map { |r| map_map[r.map_id].difficulty.to_sym }.zip(rs).to_h
            end

          import_from_row(music, current_results, row, result_batch)
        end
      end
    end
  end

  private

  # @param music [Music]
  # @param current_results [{(:normal, :hyper, :another) => Result}>]
  # @param row [IIDXIO::CSVParser::Row]
  # @param result_batch [ResultBatch]
  def import_from_row(music, current_results, row, result_batch)
    %i[normal hyper another].each do |difficulty|
      map = row.public_send(difficulty)
      next if map.no_data?

      result_attributes = {
        score: map.ex_score,
        miss_count: map.miss_count,
        clear_lamp: !map.clear_lamp.nil? ? Result.find_clear_lamp(map.clear_lamp) : nil,
        last_played_at: row.last_played_at,
        result_batch: result_batch,
      }

      if music
        create_result(
          music: music,
          difficulty: difficulty,
          current_result: current_results[difficulty],
          **result_attributes,
        )
      else
        insert_temporary_result(
          row: row,
          row_map: map,
          difficulty: difficulty,
          **result_attributes,
        )
      end
    end
  end

  # @param music [Music]
  # @param current_result [Result, nil]
  # @param difficulty [:normal, :hyper, :another]
  def create_result(music:, difficulty:, current_result:, **result_attributes)
    new_result = Result.new(
      map: music.public_send(:"#{play_style}_#{difficulty}"),
      **result_attributes,
    )

    return insert_new_result(new_result) if current_result.nil?

    return if current_result.last_played_at >= new_result.last_played_at

    is_updated = current_result.updated?(new_result)

    current_result.update!(**result_attributes)
    return unless is_updated

    insert_result_log(current_result)
  end

  # @param new_result [Result]
  def insert_new_result(new_result)
    user.results << new_result

    insert_result_log(new_result)
  end

  # @param result [Result]
  def insert_result_log(result)
    result.user = user
    result.to_log.save!
  end

  # @param row [IIDXIO::CSVParser::Row]
  # @param row_map [IIDXIO::CSVParser::Row::Map]
  # @param difficulty [:normal, :hyper, :another]
  def insert_temporary_result(row:, row_map:, difficulty:, **result_attributes)
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
