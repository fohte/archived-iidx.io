# frozen_string_literal: true

module Types
  module Object
    class UserType < Base
      field :id, resolver: Resolvers::ModelID
      field :name, String, null: false
      field :profile, UserProfileType, null: false

      field :count_by_each_level_and_grade, [LevelGradeCountType], null: false

      def count_by_each_level_and_grade
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
end
