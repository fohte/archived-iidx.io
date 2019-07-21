# frozen_string_literal: true

module Types
  module Object
    class MapListType < Base
      implements Types::Interface::Pageable

      field :nodes, [MapType], null: false

      def nodes
        object
      end
    end
  end
end
