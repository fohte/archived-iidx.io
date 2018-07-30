# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :uid, String, null: false
    field :profile, Types::UserProfileType, null: false
  end
end
