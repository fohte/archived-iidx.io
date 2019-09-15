# frozen_string_literal: true

module CSVImporter
  ResultProp = Struct.new(
    :user,
    :map_id,
    :current_result,
    :play_style,
    :difficulty,
    :row,
    :result_batch,
    keyword_init: true,
  ) do
    delegate :ex_score, :miss_count, to: :row_map
    delegate :last_played_at, to: :row

    def row_map
      @row_map ||= row.public_send(difficulty)
    end

    def result_attributes
      {
        score: ex_score,
        miss_count: miss_count,
        clear_lamp: clear_lamp,
        last_played_at: last_played_at,
        result_batch: result_batch,
      }
    end

    def clear_lamp
      @clear_lamp ||= find_clear_lamp
    end

    private

    def find_clear_lamp
      return nil if row_map.clear_lamp.nil?

      Result.find_clear_lamp(row_map.clear_lamp)
    end
  end
end
