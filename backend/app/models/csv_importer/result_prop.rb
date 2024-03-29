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
    :series,
    keyword_init: true,
  ) do
    delegate :ex_score, :miss_count, to: :row_map
    delegate :last_played_at, to: :row

    def row_map
      @row_map ||= row.public_send(difficulty)
    end

    def result_attributes
      {
        user: user,
        score: ex_score,
        miss_count: miss_count,
        clear_lamp: raw_clear_lamp,
        last_played_at: last_played_at,
        result_batch: result_batch,
        series: series,
      }
    end

    def raw_clear_lamp
      @raw_clear_lamp ||= Result.clear_lamp.find_value(clear_lamp)&.value
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
