# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Textage::Loader do
  let(:described_instance) { described_class.new(cache: ActiveSupport::Cache::MemoryStore.new) }

  describe '#fetch' do
    subject { described_instance.fetch(path) }

    let(:path) { '/score/?a011B00' }

    before do
      stub_request(:get, File.join('textage.cc', path)).to_return(body: 'test response')
      stub_request(:get, File.join('textage.cc', 'dummy')).to_return(body: 'test response')

      allow(described_instance).to receive(:sleep)
    end

    context 'with no caches' do
      it 'returns the response body' do
        expect(subject).to eq 'test response'
      end

      it 'sleeps 5 seconds' do
        freeze_time do
          described_instance.fetch(path)
          described_instance.fetch('dummy')
        end

        expect(described_instance).to have_received(:sleep).with(5)
      end
    end

    context 'with a cache' do
      before do
        described_instance.cache.write(path, 'test response')
      end

      it 'returns the response body from cache' do
        expect(subject).to eq 'test response'
      end

      it 'dose not sleep' do
        described_instance.fetch(path)
        expect(described_instance).not_to have_received(:sleep)
      end
    end
  end
end
