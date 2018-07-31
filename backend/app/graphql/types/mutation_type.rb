# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :signUpWithEmail, mutation: Mutations::SignUpWithEmail
    field :signIn, mutation: Mutations::SignIn
  end
end
