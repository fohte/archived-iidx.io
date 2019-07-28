# frozen_string_literal: true

namespace :oneshot do
  task fix_result_datetime: :environment do
    [Result, ResultLog].each do |model|
      model.all.find_in_batches do |records|
        records.each do |music|
          music.last_played_at -= 9.hours
        end

        model.import records.to_a, on_duplicate_key_update: %i[last_played_at]
      end
    end
  end
end
