# frozen_string_literal: true

module Types
  module Object
    class MutationType < Base
      def self.accessible?(context)
        context.viewer
      end

      field :create_user, mutation: Mutations::CreateUser
    end
  end
end
