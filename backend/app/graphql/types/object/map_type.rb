# frozen_string_literal: true

module Types
  module Object
    class MapType < Base
      field :id, ID, null: false
      field :num_notes, Integer, null: false
      field :level, Integer, null: false
      field :play_style, Enum::PlayStyle, null: false
      field :difficulty, Enum::Difficulty, null: false
      field :min_bpm, Integer, null: false
      field :max_bpm, Integer, null: false

      def play_style
        object.play_style.to_s.upcase
      end

      def difficulty
        object.difficulty.to_s.upcase
      end
    end
  end
end
