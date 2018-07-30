# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :signUpWithEmail, mutation: Mutations::SignUpWithEmail
  end
end
