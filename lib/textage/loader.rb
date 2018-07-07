# frozen_string_literal: true

require 'uri'
require 'nkf'
require 'faraday/response/utf8_encoder'

module Textage
  class Loader
    attr_accessor :cache

    # @param cache [ActiveSupport::Cache::Store]
    def initialize(cache: default_cache)
      @cache = cache
    end

    def fetch(path)
      return cache.fetch(path) if cache.exist?(path)

      response = connection.get(path)

      response.body.tap do |body|
        cache.write(path, body)
      end
    end

    private

    def connection
      @connection ||= Faraday.new(url: Textage::Routes::BASE_URL) do |faraday|
        faraday.response :raise_error
        faraday.response :utf8_encoder
        faraday.adapter Faraday.default_adapter
      end
    end

    def cache_path
      ENV.fetch(
        'IIDX_IO_TEXTAGE_CACHE_PATH',
        File.expand_path('~/.cache/textage_scraper'),
      )
    end

    def default_cache
      ActiveSupport::Cache::FileStore.new(cache_path, expires_in: 1.day)
    end
  end
end
