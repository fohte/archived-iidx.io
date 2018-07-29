# frozen_string_literal: true

class IIDXIOSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
end
