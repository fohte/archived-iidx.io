# frozen_string_literal: true

module Types
  module Object
    class MusicType < Base
      field :id, resolver: Resolvers::ModelID
      field :number, Integer, null: false

      def number
        object.id
      end

      field :title, String, null: false
      field :genre, String, null: false
      field :artist, String, null: false
      field :textage_uid, String, null: false
      field :series, Integer, null: false

      def series
        object.series.value
      end

      field :maps, [MapType], null: false, preload: :maps

      field :map, MapType, null: true do
        argument :play_style, Enum::PlayStyle, required: true
        argument :difficulty, Enum::Difficulty, required: true
      end

      def map(play_style:, difficulty:)
        LoaderUtils.find_by!(
          Map,
          music_id: object.id,
          play_style: play_style.downcase,
          difficulty: difficulty.downcase,
        )
      end
    end
  end
end
