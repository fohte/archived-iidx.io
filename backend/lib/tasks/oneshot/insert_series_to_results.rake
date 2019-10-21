# frozen_string_literal: true

namespace :oneshot do
  task insert_series_to_results: :environment do
    [Result, ResultLog].each do |model|
      model.find_in_batches do |results|
        results.each do |result|
          result.series = :rootage
        end

        model.import results.to_a, on_duplicate_key_update: %i[series]
      end
    end
  end
end
