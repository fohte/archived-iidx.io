# frozen_string_literal: true

class Result < ApplicationRecord
  belongs_to :user
  belongs_to :map
  belongs_to :result_batch, optional: true
  has_many :result_logs, dependent: :destroy

  validates :user_id, uniqueness: { scope: :map_id }

  include ResultConcern

  # @return [ResultLog]
  def to_log
    ResultLog.new(
      user_id: user_id,
      map_id: map_id,
      result_batch_id: result_batch_id,
      score: score,
      miss_count: miss_count,
      clear_lamp: clear_lamp,
      last_played_at: last_played_at,
    )
  end
end
