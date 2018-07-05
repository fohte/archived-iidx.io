# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Textage::Loader do
  let(:described_instance) { described_class.new }

  describe '#fetch' do
    subject { described_instance.fetch(path) }

    let(:path) { '/score/?a011B00' }

    context 'with no caches' do
      it 'returns the response body' do
        VCR.use_cassette('score_list') do
          is_expected.not_to be_nil
        end
      end
    end

    context 'with a cache' do
      let(:described_instance) do
        described_class.new(cache: ActiveSupport::Cache::MemoryStore.new)
      end

      before do
        described_instance.cache.write(path, 'test response')
      end

      it 'returns the response body from cache' do
        is_expected.to eq 'test response'
      end
    end
  end
end
