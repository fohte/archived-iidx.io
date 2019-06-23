# typed: false
# frozen_string_literal: true

class Map < ApplicationRecord
  belongs_to :music
  has_many :results, dependent: :nullify
  has_many :result_logs, dependent: :nullify

  has_one :kaiden_average_result, dependent: :destroy
  has_one :world_record_result, dependent: :destroy

  include PlayStyleEnum
  include DifficultyEnum

  # @return [Array<Array(::Enumerize::Value, ::Enumerize::Value)>] all combination of play_styles and difficulty
  def self.types
    play_style.values.product(difficulty.values)
  end

  def max_score
    num_notes * 2
  end
end
