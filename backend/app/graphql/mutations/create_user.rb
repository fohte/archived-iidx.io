# frozen_string_literal: true

module Mutations
  class CreateUser < BaseMutation
    argument :firebase_uid, String, required: true
    argument :uid, String, required: true
    argument :username, String, required: true

    field :user, Types::Object::UserType, null: false

    def resolve(firebase_uid:, uid:, username:)
      {
        user: ::User.signup(firebase_uid: firebase_uid, uid: uid, username: username),
      }
    end
  end
end
