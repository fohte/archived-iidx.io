# frozen_string_literal: true

module Mutations
  class SignUpWithEmail < Mutations::BaseMutation
    argument :uid, String, required: true
    argument :name, String, required: false
    argument :email, String, required: true
    argument :password, String, required: true

    field :user, Types::UserType, null: true
    field :token, String, null: true
    field :errors, [String], null: false

    def resolve(uid:, name: uid, email:, password:)
      token = UserToken.new

      user = User.new(
        uid: uid,
        profile: UserProfile.new(name: name),
        auth_emails: [UserAuthEmail.new(email: email, password: password)],
        tokens: [token],
      )

      if user.save
        {
          user: user,
          token: token,
          errors: [],
        }
      else
        {
          user: nil,
          token: nil,
          errors: user.errors.full_messages,
        }
      end
    end
  end
end
