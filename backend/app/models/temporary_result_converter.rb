# frozen_string_literal: true

module TemporaryResultConverter
  def self.convert
    BatchProcessor.new.run
  end
end
