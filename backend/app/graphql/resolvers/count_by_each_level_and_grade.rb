# frozen_string_literal: true

module Resolvers
  class CountByEachLevelAndGrade < Resolvers::Base
    type [Types::Object::LevelGradeCountType], null: false

    argument :play_style, Types::Enum::PlayStyle, required: true

    def resolve(play_style:)
      sql = <<~SQL.squish
        RIGHT OUTER JOIN
          maps
        ON
          maps.id = results.map_id AND
          results.user_id = :user_id
      SQL

      join_statement = Result.sanitize_sql_array([sql, user_id: object.id])

      count_hash =
        Result
        .joins(join_statement)
        .where(maps: { play_style: play_style })
        .group(%w[maps.level grade])
        .count

      count_hash.map do |(level, grade), count|
        {
          level: level,
          grade: grade,
          count: count,
        }
      end
    end
  end
end
