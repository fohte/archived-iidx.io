# frozen_string_literal: true

module Types
  module Edge
    class MapEdge < GraphQL::Types::Relay::BaseEdge
      node_type(Types::Object::MapType)
    end
  end
end
