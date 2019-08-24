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
        LoaderUtils.find_by!(User, name: name)
      end

      field :musics, [MusicType], null: true do
        description 'Find musics.'
      end

      def musics
        ::Music.includes('maps').where(maps: { level: 12, play_style: :sp })
      end

      field :music, MusicType, null: true do
        description 'Find a music.'
        argument :number, Integer, required: true
      end

      def music(number:)
        LoaderUtils.find_by!(Music, id: number)
      end

      field :maps, [MapType], null: true do
        description 'Find maps.'
      end

      def maps
        Map.includes(:music).where(level: 12, play_style: :sp)
      end

      field :search_maps, resolver: Resolvers::SearchMaps, description: 'Search maps.'

      field :updated_results, resolver: Resolvers::UpdatedResults
    end
  end
end
