# frozen_string_literal: true

require 'pathname'

module TextageScraper
  def self.cache_path
    Pathname.new(ENV.fetch('IIDX_IO_TEXTAGE_SCRAPER_CACHE_PATH', File.expand_path('~/.cache/textage_scraper')))
  end
end
