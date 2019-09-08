# frozen_string_literal: true

module Types
  module Object
    class UserType < Base
      field :id, resolver: Resolvers::ModelID
      field :name, String, null: false
      field :profile, UserProfileType, null: false

      field :count_by_each_level_and_grade, [LevelGradeCountType], null: false

      def count_by_each_level_and_grade
        count_hash = object.results.joins(:map).group(%w[maps.level grade]).count

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
