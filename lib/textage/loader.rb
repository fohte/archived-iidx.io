# frozen_string_literal: true

require 'uri'
require 'nkf'
require 'faraday/response/utf8_encoder'

module Textage
  class Loader
    attr_accessor :cache_expires_in
    attr_accessor :cache_path

    def initialize(cache_expires_in: 1.day, cache_path: default_cache_path)
      @cache_expires_in = cache_expires_in
      @cache_path = cache_path
    end

    def fetch(path)
      return cache.fetch(path) if cache.exist?(path)

      response = connection.get(path)

      response.body.tap do |body|
        cache.write(path, body)
      end
    end

    def cache
      @cache ||= ActiveSupport::Cache.lookup_store(:file_store, cache_path, expires_in: cache_expires_in)
    end

    private

    def connection
      @connection ||= Faraday.new(url: Textage::Routes::BASE_URL) do |faraday|
        faraday.response :raise_error
        faraday.response :utf8_encoder
        faraday.adapter Faraday.default_adapter
      end
    end

    def default_cache_path
      ENV.fetch(
        'IIDX_IO_TEXTAGE_CACHE_PATH',
        File.expand_path('~/.cache/textage_scraper'),
      )
    end
  end
end
