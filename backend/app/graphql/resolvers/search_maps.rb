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

    argument :updated, Types::InputObject::UpdatedResultFilter, required: false
    argument :grade, Types::Enum::Grade, required: false

    def resolve(
      username:,
      offset: 0,
      limit: MAX_PAGE_SIZE,
      title: '',
      levels: [],
      play_style: nil,
      difficulties: [],
      updated: nil,
      grade: nil
    )
      LoaderUtils.find_by!(User, name: username) do |user|
        maps = Map.includes(:music)
        maps = maps.where(music: Music.fuzzy_search_by_title(title)) if title.present?
        maps = maps.where(level: levels) unless levels.empty?
        maps = maps.where(play_style: play_style) unless play_style.nil?
        maps = maps.where(difficulty: difficulties) unless difficulties.empty?

        maps =
          filter_with_results(maps, user: user, updated: updated, grade: grade)
          .offset(offset).limit(limit)

        Loaders::ScopeLoader.for(Result).load(maps)
      end
    end

    private

    def filter_with_results(maps, user:, updated:, grade:)
      if updated.nil?
        join_results(maps, user: user, grade: grade)
      else
        join_result_logs(maps, user: user, updated: updated, grade: grade)
      end
    end

    def join_results(maps, user:, grade:)
      results =
        user
        .results
        .order(last_played_at: :desc)

      results = results.where(grade: find_grade_value(grade)) unless grade.nil?

      maps
        .left_outer_joins(:results)
        .merge(results)
    end

    def join_result_logs(maps, user:, updated:, grade:)
      results =
        user
        .result_logs
        .updated_results(
          base_datetime: updated.base_datetime,
          target_datetime: updated.target_datetime,
        )
        .order(last_played_at: :desc)

      results = results.where(grade: find_grade_value(grade)) unless grade.nil?

      maps
        .joins(:result_logs)
        .merge(results)
    end

    def find_grade_value(grade)
      grade == 'NO_PLAY' ? nil : grade
    end
  end
end
