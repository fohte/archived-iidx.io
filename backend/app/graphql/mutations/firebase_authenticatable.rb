# frozen_string_literal: true

module Mutations
  module FirebaseAuthenticatable
    def ready?(**)
      raise GraphQL::ExecutionError, 'Requires authentication' if context.firebase_uid.nil?

      true
    end
  end
end
