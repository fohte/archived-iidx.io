# frozen_string_literal: true

namespace :result do
  task bulk_retry_registration: :environment do
    ApplicationRecord.transaction do
      TemporaryResult.bulk_convert_to_result
    end
  end
end
