# frozen_string_literal: true

module Types
  module Object
    class QueryType < Base
      # Add root-level fields here.
      # They will be entry points for queries on your schema.

      field :viewer, UserType, null: true do
        description 'The currently authenticated user.'
      end

      delegate :viewer, to: :context

      field :user, UserType, null: true do
        description 'Find a user by name.'
        argument :name, String, required: true
      end

      def user(name:)
        User.find_by!(name: name)
      rescue ActiveRecord::RecordNotFound => e
        raise IIDXIO::GraphQL::NotFoundError, e.message
      end

      field :musics, [MusicType], null: true do
        description 'Find musics.'
      end

      def musics
        ::Music.includes('maps').where(maps: { level: 12, play_style: :sp })
      end

      field :music, MusicType, null: true do
        description 'Find a music.'
        argument :id, ID, required: true
      end

      def music(id:)
        Music.find(id)
      rescue ActiveRecord::RecordNotFound => e
        raise IIDXIO::GraphQL::NotFoundError, e.message
      end

      field :maps, [MapType], null: true do
        description 'Find maps.'
      end

      def maps
        Map.includes(:music).where(level: 12, play_style: :sp)
      end

      field :search_maps, [MapType], null: true do
        description 'Search maps.'
        argument :title, String, required: false
        argument :levels, [Integer, null: true], required: false
        argument :play_style, Enum::PlayStyle, required: false
        argument :difficulties, [Enum::Difficulty, null: true], required: false
      end

      def search_maps(title: '', levels: [], play_style: nil, difficulties: [])
        maps = Map.includes(:music, :results)
        maps = maps.where(music: Music.fuzzy_search_by_title(title)) if title.present?
        maps = maps.where(level: levels) unless levels.empty?
        maps = maps.where(play_style: play_style) unless play_style.nil?
        maps = maps.where(difficulty: difficulties) unless difficulties.empty?

        maps
      end
    end
  end
end
