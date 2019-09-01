# frozen_string_literal: true

module Types
  module Object
    class UserType < Base
      field :id, resolver: Resolvers::ModelID
      field :name, String, null: false
      field :profile, UserProfileType, null: false
    end
  end
end
