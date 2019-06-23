# typed: strict
# frozen_string_literal: true

module Types
  module Object
    class MutationType < Base
      field :create_user, mutation: Mutations::CreateUser
      field :registerResultsWithCSV, mutation: Mutations::RegisterResultsWithCSV
    end
  end
end
