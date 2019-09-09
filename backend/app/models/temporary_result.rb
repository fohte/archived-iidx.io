# frozen_string_literal: true

class TemporaryResult < ApplicationRecord
  belongs_to :user
  belongs_to :result_batch, optional: true

  include ClearLampEnum
  include PlayStyleEnum
  include DifficultyEnum

  class << self
    def bulk_convert_to_result
      find_in_batches do |temp_results|
        result_sets = temp_results.map do |temp_result|
          [temp_result.id, temp_result.to_result]
        end.to_h.compact

        result_sets.values.each { |r| r.run_callbacks(:save) }

        Result.import(result_sets.values)

        destroy(result_sets.keys)
      end
    end
  end

  def to_result
    music = Music.find_by(csv_title: title)
    return nil if music.nil?

    map = music.find_map(play_style, difficulty)
    return nil if map.nil?

    Result.new(
      user: user,
      result_batch: result_batch,
      map: map,
      score: score,
      miss_count: miss_count,
      clear_lamp: clear_lamp,
      last_played_at: last_played_at,
    )
  end
end
