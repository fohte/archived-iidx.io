# frozen_string_literal: true

namespace :oneshot do
  task insert_result_batch_id: :environment do
    ResultLog.all.preload(:result).find_in_batches do |result_logs|
      result_logs.each do |result_log|
        result_log.result_batch_id = result_log.result&.result_batch_id
      end

      ResultLog.import result_logs.to_a, on_duplicate_key_update: %i[result_batch_id]
    end
  end
end
