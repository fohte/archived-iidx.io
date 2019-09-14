# frozen_string_literal: true

module CSVImporter
  class MapProcessor
    # @return [User]
    attr_reader :user

    # @return [Integer]
    attr_reader :map_id

    # @return [Result]
    attr_reader :current_result

    # @return [:sp, :dp]
    attr_reader :play_style

    # @return [:normal, :hyper, :another]
    attr_reader :difficulty

    # @return [IIDXIO::CSVParser::Row]
    attr_reader :row

    # @return [ResultBatch]
    attr_reader :result_batch

    def initialize(user:, map_id:, current_result:, play_style:, difficulty:, row:, result_batch:)
      @user = user
      @map_id = map_id
      @current_result = current_result
      @play_style = play_style
      @difficulty = difficulty
      @row = row
      @result_batch = result_batch
    end

    def import_result
      return if row_map.no_data?

      if map_id
        create_result
      else
        insert_temporary_result
      end
    end

    # @return [IIDXIO::CSVParser::Row::Map]
    def row_map
      @row_map ||= row.public_send(difficulty)
    end

    private

    def result_attributes
      {
        score: row_map.ex_score,
        miss_count: row_map.miss_count,
        clear_lamp: clear_lamp,
        last_played_at: row.last_played_at,
        result_batch: result_batch,
      }
    end

    def clear_lamp
      return nil if row_map.clear_lamp.nil?

      Result.find_clear_lamp(row_map.clear_lamp)
    end

    def create_result
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
      user.results << new_result

      insert_result_log(new_result)
    end

    # @param result [Result]
    def insert_result_log(result)
      result.user = user
      result.to_log.save!
    end

    def insert_temporary_result
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
