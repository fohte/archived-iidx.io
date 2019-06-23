# typed: strict
# frozen_string_literal: true

module Types
  module Object
    class UserType < Base
      field :id, ID, null: false
      field :name, String, null: false
      field :profile, UserProfileType, null: false
    end
  end
end
