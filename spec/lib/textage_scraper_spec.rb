# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TextageScraper do
  describe '.cache_path' do
    subject { described_class.cache_path }

    context 'when the IIDX_IO_TEXTAGE_SCRAPER_CACHE_PATH env var is empty' do
      it 'returns ~/.cache/textage_scraper' do
        switch_env 'IIDX_IO_TEXTAGE_SCRAPER_CACHE_PATH', nil do
          is_expected.to eq Pathname.new(File.expand_path('~/.cache/textage_scraper'))
        end
      end
    end

    context 'when the IIDX_IO_TEXTAGE_SCRAPER_CACHE_PATH env var is not empty' do
      it 'returns $IIDX_IO_TEXTAGE_SCRAPER_CACHE_PATH' do
        Dir.mktmpdir do |dir|
          switch_env 'IIDX_IO_TEXTAGE_SCRAPER_CACHE_PATH', dir do
            is_expected.to eq Pathname.new(dir)
          end
        end
      end
    end
  end
end
