# frozen_string_literal: true

module Types
  class PreloadableExtension < GraphQL::Schema::FieldExtension
    def resolve(object:, arguments:, **_rest)
      record = object.object

      promises = options[:associations].map do |association|
        Loaders::AssociationLoader.for(record.class, association).load(record)
      end

      Promise.all(promises).then do
        yield(object, arguments)
      end
    end
  end
end
