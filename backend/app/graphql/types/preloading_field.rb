# frozen_string_literal: true

module Types
  class PreloadingField < ::GraphQL::Schema::Field
    def initialize(*args, preload: nil, **kwargs, &block)
      super(*args, **kwargs, &block)

      return unless preload

      extension(Types::PreloadableExtension, associations: Array(preload))
    end
  end
end
