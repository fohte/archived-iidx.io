# frozen_string_literal: true

module CSVImporter
  class ResultProcessor
    # @return [CSVImporter::ResultProp]
    attr_reader :result_prop

    def initialize(result_prop)
      @result_prop = result_prop
    end

    delegate(
      :current_result,
      :map_id,
      :result_attributes,
      to: :result_prop,
    )

    # @param store [CSVImporter::ResultStore]
    def store_result(store)
      return insert_new_result(store) if current_result.nil?

      return unless last_played_updated?

      result_updated?.tap do |is_updated|
        store.results << current_result.tap do |r|
          r.assign_attributes(result_attributes)
        end

        insert_result_log(store, current_result) if is_updated
      end
    end

    private

    def new_result
      @new_result ||= Result.new(map_id: map_id, **result_attributes)
    end

    def last_played_updated?
      current_result.last_played_at < new_result.last_played_at
    end

    def result_updated?
      current_result.updated?(new_result)
    end

    # @param store [CSVImporter::ResultStore]
    def insert_new_result(store)
      store.results << new_result

      insert_result_log(store, new_result)
    end

    # @param store [CSVImporter::ResultStore]
    # @param result [Result]
    def insert_result_log(store, result)
      store.result_logs << result.to_log
    end
  end
end
