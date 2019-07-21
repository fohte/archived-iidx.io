# frozen_string_literal: true

module Types
  module Interface
    module Pageable
      include Types::Interface::Base

      field :total_count, Integer, null: false

      def total_count
        object.except(:limit, :offset).count
      end
    end
  end
end
