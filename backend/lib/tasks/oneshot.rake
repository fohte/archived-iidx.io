# frozen_string_literal: true

namespace :oneshot do
  task insert_grade: :environment do
    [Result, ResultLog].each do |model|
      model.all.preload(:map).find_in_batches do |records|
        records.each do |record|
          record.run_callbacks(:save) { false }
        end

        model.import records.to_a, on_duplicate_key_update: %i[grade]
      end
    end
  end
end
