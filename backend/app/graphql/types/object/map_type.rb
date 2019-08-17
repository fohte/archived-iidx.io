# frozen_string_literal: true

module Types
  module Object
    class MapType < Base
      field :id, ID, null: false

      field :music, MusicType, null: false

      def music
        Loaders::AssociationLoader.for(Map, :music).load(object)
      end

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
        LoaderUtils.find_by!(User, name: username) do |user|
          Loaders::AssociationLoader.for(Map, :results, scope: user.results).load(object).then(&:first)
        end
      end

      field :results, [ResultType], null: false do
        argument :username, String, required: true
      end

      def results(username:)
        LoaderUtils.find_by!(User, name: username) do |user|
          Loaders::AssociationLoader.for(Map, :result_logs, scope: user.result_logs).load(object)
        end
      end
    end
  end
end
