# frozen_string_literal: true

module TitleNormalizer
  module Filterable
    extend ActiveSupport::Concern

    included do
      class_attribute :filters
      attr_reader :raw

      delegate :filters, to: :class
    end

    def initialize(raw)
      @raw = raw
    end

    def filter
      filters.inject(raw) do |memo, filter|
        filter.call(memo)
      end
    end
  end
end
