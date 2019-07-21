# frozen_string_literal: true

module Resolvers
  class SearchMaps < Resolvers::Base
    type Types::Object::MapListType, null: false

    MAX_PAGE_SIZE = 50

    argument :offset, Integer, required: false
    argument :limit, Integer, required: false
    argument :title, String, required: false
    argument :levels, [Integer, null: true], required: false
    argument :play_style, Types::Enum::PlayStyle, required: false
    argument :difficulties, [Types::Enum::Difficulty, null: true], required: false

    def resolve(offset: 0, limit: MAX_PAGE_SIZE, title: '', levels: [], play_style: nil, difficulties: [])
      maps = Map.includes(:music, :results)
      maps = maps.where(music: Music.fuzzy_search_by_title(title)) if title.present?
      maps = maps.where(level: levels) unless levels.empty?
      maps = maps.where(play_style: play_style) unless play_style.nil?
      maps = maps.where(difficulty: difficulties) unless difficulties.empty?

      maps.offset(offset).limit(limit)
    end
  end
end
