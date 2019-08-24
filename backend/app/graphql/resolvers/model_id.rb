# frozen_string_literal: true

module Resolvers
  class ModelID < Resolvers::Base
    type ID, null: false

    def resolve
      object.uuid
    end
  end
end
