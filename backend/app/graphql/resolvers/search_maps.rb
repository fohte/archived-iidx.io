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
    argument :grades, [Types::Enum::Grade], required: false

    def resolve(
      username:,
      offset: 0,
      limit: MAX_PAGE_SIZE,
      title: '',
      levels: [],
      grades: [],
      play_style: nil,
      difficulties: [],
      updated: nil
    )
      LoaderUtils.find_by!(User, name: username) do |user|
        maps = Map.includes(:music)
        maps = maps.where(music: Music.fuzzy_search_by_title(title)) if title.present?
        maps = maps.where(level: levels) unless levels.empty?
        maps = maps.where(play_style: play_style) unless play_style.nil?
        maps = maps.where(difficulty: difficulties) unless difficulties.empty?

        maps =
          filter_with_results(maps, user: user, updated: updated, grades: grades)
          .offset(offset).limit(limit)

        Loaders::ScopeLoader.for(Result).load(maps)
      end
    end

    private

    def filter_with_results(maps, user:, updated:, grades:)
      if updated.nil?
        join_results(maps, user: user, grades: grades)
      else
        join_result_logs(maps, user: user, updated: updated, grades: grades)
      end
    end

    def join_results(maps, user:, grades:)
      results =
        Result
        .order(last_played_at: :desc)

      results = results.where(grade: find_grade_values(grades)) unless grades.empty?

      sql = <<~SQL.squish
        LEFT OUTER JOIN
          results
        ON
          maps.id = results.map_id AND
          results.user_id = :user_id
      SQL

      join_statement = Result.sanitize_sql_array([sql, user_id: user.id])

      maps
        .joins(join_statement)
        .merge(results)
    end

    def join_result_logs(maps, user:, updated:, grades:)
      results =
        user
        .result_logs
        .updated_results(
          base_datetime: updated.base_datetime,
          target_datetime: updated.target_datetime,
        )
        .order(last_played_at: :desc)

      results = results.where(grade: find_grade_values(grades)) unless grades.empty?

      maps
        .joins(:result_logs)
        .merge(results)
    end

    def find_grade_values(grades)
      grades.map { |grade| find_grade_value(grade) }
    end

    def find_grade_value(grade)
      grade == 'NO_PLAY' ? nil : grade
    end
  end
end
