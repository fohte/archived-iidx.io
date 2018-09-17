# frozen_string_literal: true

module Mutations
  class CreateUser < BaseMutation
    argument :firebase_uid, String, required: true
    argument :username, String, required: true
    argument :display_name, String, required: true

    field :user, Types::Object::UserType, null: false

    def resolve(firebase_uid:, username:, display_name:)
      {
        user: ::User.signup(
          firebase_uid: firebase_uid,
          username: username,
          display_name: display_name,
        ),
      }
    end
  end
end
