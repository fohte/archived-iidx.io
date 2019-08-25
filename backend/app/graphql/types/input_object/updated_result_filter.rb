# frozen_string_literal: true

module Types
  module InputObject
    class UpdatedResultFilter < Base
      argument :base_datetime, GraphQL::Types::ISO8601DateTime, required: false
      argument :target_datetime, GraphQL::Types::ISO8601DateTime, required: true
    end
  end
end
