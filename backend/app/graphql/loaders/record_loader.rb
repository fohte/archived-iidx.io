# frozen_string_literal: true

module Loaders
  class RecordLoader < GraphQL::Batch::Loader
    def self.loader_key_for(*args, scope: nil, **kwargs)
      super(*args, scope: scope&.to_sql, **kwargs)
    end

    def initialize(model, columns: [model.primary_key], scope: nil, multiple: false)
      @model = model
      @columns = Array(columns).map(&:to_s)
      @column_types = @columns.map { |c| model.type_for_attribute(c) }
      @scope = scope
      @multiple = multiple
    end

    def load(values)
      super(@column_types.zip(values).map { |type, value| type.cast(value) })
    end

    def perform(keys)
      @multiple ? perform_multiple(keys) : perform_single(keys)
    end

    private

    def perform_multiple(keys)
      records = query(keys)

      values = {}

      records.each do |record|
        key = @columns.map { |c| record.public_send(c) }
        if values.key?(key)
          values[key] << record
        else
          values[key] = [record]
        end
      end

      values.each { |key, value| fulfill(key, value) }

      keys.each { |key| fulfill(key, nil) unless fulfilled?(key) }
    end

    def perform_single(keys)
      query(keys).each { |record| fulfill(@columns.map { |c| record.public_send(c) }, record) }
      keys.each { |key| fulfill(key, nil) unless fulfilled?(key) }
    end

    def query(keys)
      scope = @scope || @model
      scope.where(@columns.zip(keys.transpose).to_h)
    end
  end
end
