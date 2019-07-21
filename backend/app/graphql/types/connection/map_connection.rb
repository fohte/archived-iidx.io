# frozen_string_literal: true

module Types
  module Connection
    class MapConnection < GraphQL::Types::Relay::BaseConnection
      edge_type(Types::Edge::MapEdge)

      field :total_count, Integer, null: false

      def total_count
        object.nodes.size
      end
    end
  end
end
