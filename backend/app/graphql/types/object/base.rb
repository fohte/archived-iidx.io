# frozen_string_literal: true

module Types
  module Object
    class Base < ::GraphQL::Schema::Object
      field_class ::Types::PreloadingField
    end
  end
end
