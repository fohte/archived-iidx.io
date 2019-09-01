# frozen_string_literal: true

module IIDXIO
  class << self
    def root
      Rails.root.join('..')
    end
  end
end
