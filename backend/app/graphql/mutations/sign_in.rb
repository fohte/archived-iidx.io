# frozen_string_literal: true

module Mutations
  class SignIn < Mutations::BaseMutation
    argument :uid, String, required: true
    argument :password, String, required: true

    field :user, Types::UserType, null: true
    field :token, String, null: true
    field :errors, [String], null: false

    def resolve(uid:, password:)
      user = User.joins(:auth_email).find_by!(uid: uid)
      return invalid_fields(user) unless user.auth_email.authenticate(password)

      token_model = UserToken.new
      user.tokens << token_model

      {
        user: user,
        token: token_model.token,
        errors: [],
      }
    rescue ActiveRecord::RecordNotFound
      invalid_fields(user)
    end

    def invalid_fields(user)
      {
        user: nil,
        token: nil,
        errors: user.errors.full_messages,
      }
    end
  end
end
