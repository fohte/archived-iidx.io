# frozen_string_literal: true

module Loaders
  class RecordLoader < GraphQL::Batch::Loader
    def self.loader_key_for(*args, scope: nil, **kwargs)
      super(*args, scope: scope&.to_sql, **kwargs)
    end

    def initialize(model, columns: [model.primary_key], scope: nil)
      @model = model
      @columns = Array(columns).map(&:to_s)
      @column_types = @columns.map { |c| model.type_for_attribute(c) }
      @scope = scope
    end

    def load(values)
      super(@column_types.zip(values).map { |type, value| type.cast(value) })
    end

    def perform(keys)
      query(keys).each { |record| fulfill(@columns.map { |c| record.public_send(c) }, record) }
      keys.each { |key| fulfill(key, nil) unless fulfilled?(key) }
    end

    private

    def query(keys)
      scope = @scope || @model
      scope.where(@columns.zip(keys.transpose).to_h)
    end
  end
end
