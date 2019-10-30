# frozen_string_literal: true

module TemporaryResultConverter
  class BatchProcessor
    def run
      ActiveRecord::Base.transaction do
        TemporaryResult.distinct.pluck(:series).each do |series|
          TemporaryResult.find_in_batches do |temp_results|
            Processor.new(temp_results, series: series).run
          end
        end
      end

      Notifier.new.notify
    end
  end
end
