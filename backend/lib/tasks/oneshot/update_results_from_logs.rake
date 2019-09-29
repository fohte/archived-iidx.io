# frozen_string_literal: true

namespace :oneshot do
  task update_results_from_logs: :environment do
    ActiveRecord::Base.transaction do
      Result.includes(:user, :map).where(user_id: 1).find_in_batches do |results|
        results.each do |result|
          result_log = ResultLog.where(
            user: result.user,
            map: result.map,
          ).last

          next if result_log.nil?
          next if result_log.last_played_at < result.last_played_at

          result.assign_attributes(
            score: result_log.score,
            miss_count: result_log.miss_count,
            clear_lamp: result_log.clear_lamp,
            last_played_at: result_log.last_played_at,
          )

          result.run_callbacks(:save)
        end

        Result.import results.select(&:changed?).to_a, on_duplicate_key_update: %i[score miss_count clear_lamp last_played_at grade]
      end
    end
  end
end
