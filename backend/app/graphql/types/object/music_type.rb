# frozen_string_literal: true

module Types
  module Object
    class MusicType < Base
      field :id, ID, null: false
      field :title, String, null: false
      field :sub_title, String, null: false
      field :genre, String, null: false
      field :artist, String, null: false
      field :textage_uid, String, null: false
      field :series, Integer, null: false

      def series
        object.series.value
      end

      field :leggendaria, Boolean, null: false
      field :maps, [MapType], null: false

      field :map, MapType, null: true do
        argument :play_style, Enum::PlayStyle, required: true
        argument :difficulty, Enum::Difficulty, required: true
      end

      def map(play_style:, difficulty:)
        object.maps.find_by!(play_style: play_style, difficulty: difficulty)
      rescue ActiveRecord::RecordNotFound => e
        raise IIDXIO::GraphQL::NotFoundError, e.message
      end
    end
  end
end
