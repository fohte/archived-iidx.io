# frozen_string_literal: true

class IIDXIOSchema < GraphQL::Schema
  mutation(Types::Object::MutationType)
  query(Types::Object::QueryType)
end
