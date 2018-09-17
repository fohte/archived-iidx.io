# frozen_string_literal: true

module Mutations
  class CreateUser < BaseMutation
    include Authenticatable

    argument :username, String, required: true
    argument :display_name, String, required: false

    field :user, Types::Object::UserType, null: false

    def resolve(username:, display_name: nil)
      {
        user: ::User.signup(
          firebase_uid: context.firebase_uid,
          username: username,
          display_name: display_name || username,
        ),
      }
    end
  end
end
