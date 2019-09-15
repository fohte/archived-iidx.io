# frozen_string_literal: true

class TemporaryResultConverter
  def convert
    TemporaryResult.find_in_batches do |temp_results|
      result_sets = temp_results.map do |temp_result|
        [temp_result.id, temp_result.to_result]
      end.to_h.compact

      result_sets.values.each { |r| r.run_callbacks(:save) }

      Result.import(result_sets.values)

      TemporaryResult.destroy(result_sets.keys)
    end
  end
end
