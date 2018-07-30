# frozen_string_literal: true

module Types
  class UserProfileType < Types::BaseObject
    field :name, String, null: false
  end
end
