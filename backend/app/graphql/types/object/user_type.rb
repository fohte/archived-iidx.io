# frozen_string_literal: true

module Types
  module Object
    class UserType < Base
      field :id, resolver: Resolvers::ModelID
      field :name, String, null: false
      field :profile, UserProfileType, null: false

      field :count_by_each_level_and_grade, resolver: Resolvers::CountByEachLevelAndGrade
    end
  end
end
