# frozen_string_literal: true

module Types
  module Object
    class UserProfileType < Base
      field :id, resolver: Resolvers::ModelID
      field :display_name, String, null: false
    end
  end
end
