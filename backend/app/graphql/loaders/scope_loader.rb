# frozen_string_literal: true

module Loaders
  class ScopeLoader < GraphQL::Batch::Loader
    def initialize(model)
      @model = model
    end

    def cache_key(scope)
      scope.to_sql
    end

    def perform(keys)
      query(keys).each { |record| fulfill(record, record) }
      keys.each { |key| fulfill(key, nil) unless fulfilled?(key) }
    end

    private

    def query(keys)
      keys.each(&:load)
    end
  end
end
