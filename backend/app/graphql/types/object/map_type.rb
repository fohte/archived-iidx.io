# typed: false
# frozen_string_literal: true

module Types
  module Object
    class MapType < Base
      field :id, ID, null: false
      field :music, MusicType, null: false
      field :num_notes, Integer, null: false
      field :level, Integer, null: false
      field :play_style, Enum::PlayStyle, null: false

      def play_style
        object.play_style.to_s.upcase
      end

      field :difficulty, Enum::Difficulty, null: false

      def difficulty
        object.difficulty.to_s.upcase
      end

      field :min_bpm, Integer, null: false
      field :max_bpm, Integer, null: false

      field :result, ResultType, null: true do
        argument :username, String, required: true
      end

      def result(username:)
        object.results.find_by(user: User.find_by!(name: username))
      rescue ActiveRecord::RecordNotFound => e
        raise IIDXIO::GraphQL::NotFoundError, e.message
      end
    end
  end
end
