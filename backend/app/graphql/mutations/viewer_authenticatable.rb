# typed: false
# frozen_string_literal: true

module Mutations
  module ViewerAuthenticatable
    def ready?(**)
      raise GraphQL::ExecutionError, 'Requires authentication' if context.viewer.nil?

      true
    end
  end
end
