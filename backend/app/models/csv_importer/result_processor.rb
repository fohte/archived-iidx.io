# frozen_string_literal: true

module CSVImporter
  class ResultProcessor
    # @return [CSVImporter::ResultProp]
    attr_reader :result_prop

    def initialize(result_prop)
      @result_prop = result_prop
    end

    delegate(
      :user,
      :current_result,
      :map_id,
      :result_attributes,
      to: :result_prop,
    )

    def import
      return insert_new_result if current_result.nil?

      return unless last_played_updated?

      result_updated?.tap do |is_updated|
        current_result.update!(**result_attributes)

        insert_result_log(current_result) if is_updated
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

    def insert_new_result
      user.results << new_result

      insert_result_log(new_result)
    end

    # @param result [Result]
    def insert_result_log(result)
      result.user = user
      result.to_log.save!
    end
  end
end
