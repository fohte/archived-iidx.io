# frozen_string_literal: true

module LoaderUtils
  class << self
    def find_by(*args, **kwargs, &block)
      promise = load_promise(*args, **kwargs)

      if block_given?
        promise.then(&block)
      else
        promise.then { |record| record }
      end
    end

    def find_by!(model, column_values, **kwargs)
      promise = load_promise(model, column_values, **kwargs)

      promise.then do |record|
        raise IIDXIO::GraphQL::NotFoundError, "Couldn't find #{model.name} with #{column_values.to_json}" if record.nil?

        if block_given?
          yield(record)
        else
          record
        end
      end
    end

    private

    def load_promise(model, column_values, scope: nil)
      Loaders::RecordLoader
        .for(model, columns: column_values.keys, scope: scope)
        .load(column_values.values)
    end
  end
end
