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
      field :leggendaria, Boolean, null: false
      field :maps, [MapType], null: false
    end
  end
end
