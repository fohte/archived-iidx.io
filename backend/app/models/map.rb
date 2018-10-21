# frozen_string_literal: true

class Map < ApplicationRecord
  belongs_to :music
  has_many :results, dependent: :nullify

  include PlayStyleEnum
  include DifficultyEnum

  # @return [Array<Array(::Enumerize::Value, ::Enumerize::Value)>] all combination of play_styles and difficulty
  def self.types
    play_style.values.product(difficulty.values)
  end
end
