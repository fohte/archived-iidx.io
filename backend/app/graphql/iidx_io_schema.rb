# frozen_string_literal: true

class IIDXIOSchema < GraphQL::Schema
  context_class ViewerContext
  mutation(Types::Object::MutationType)
  query(Types::Object::QueryType)
end
