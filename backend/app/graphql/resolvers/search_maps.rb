# frozen_string_literal: true

module Resolvers
  class SearchMaps < Resolvers::Base
    type Types::Object::MapListType, null: false

    MAX_PAGE_SIZE = 50

    argument :username, String, required: true
    argument :offset, Integer, required: false
    argument :limit, Integer, required: false
    argument :title, String, required: false
    argument :levels, [Integer, null: true], required: false
    argument :play_style, Types::Enum::PlayStyle, required: false
    argument :difficulties, [Types::Enum::Difficulty, null: true], required: false

    def resolve(username:, offset: 0, limit: MAX_PAGE_SIZE, title: '', levels: [], play_style: nil, difficulties: [])
      user = User.find_by!(name: username)

      maps = Map.includes(:music)
      maps = maps.where(music: Music.fuzzy_search_by_title(title)) if title.present?
      maps = maps.where(level: levels) unless levels.empty?
      maps = maps.where(play_style: play_style) unless play_style.nil?
      maps = maps.where(difficulty: difficulties) unless difficulties.empty?

      maps
        .left_outer_joins(:results)
        .merge(Result.where(user: user).order(last_played_at: :desc))
        .offset(offset)
        .limit(limit)
    rescue ActiveRecord::RecordNotFound => e
      raise IIDXIO::GraphQL::NotFoundError, e.message
    end
  end
end
