# typed: true
# frozen_string_literal: true

module Textage
  module Routes
    BASE_URL = 'http://textage.cc'

    def self.path(path_str)
      File.join(BASE_URL, path_str)
    end
  end
end
