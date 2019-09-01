# frozen_string_literal: true

module Types
  module Object
    class ResultListType < Base
      implements Types::Interface::Pageable

      field :nodes, [ResultType], null: false

      def nodes
        object
      end
    end
  end
end
