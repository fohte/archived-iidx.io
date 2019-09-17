# frozen_string_literal: true

namespace :iidx_io do
  task temp_result_conv: :environment do
    TemporaryResultConverter.convert
  end
end
