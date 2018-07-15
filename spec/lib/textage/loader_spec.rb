# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Textage::Loader do
  let(:described_instance) { described_class.new(cache: ActiveSupport::Cache::MemoryStore.new) }

  describe '#fetch' do
    subject { described_instance.fetch(path) }

    let(:path) { '/score/?a011B00' }

    before do
      stub_request(:get, "textage.cc#{path}").to_return(body: 'test response')
    end

    context 'with no caches' do
      it 'returns the response body' do
        is_expected.to eq 'test response'
      end
    end

    context 'with a cache' do
      before do
        described_instance.cache.write(path, 'test response')
      end

      it 'returns the response body from cache' do
        is_expected.to eq 'test response'
      end
    end
  end
end
