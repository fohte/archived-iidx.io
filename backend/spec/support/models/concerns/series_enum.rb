# frozen_string_literal: true

require 'rails_helper'

RSpec.shared_examples 'SeriesEnum' do
  describe '.find_version_value!' do
    subject { described_class.find_version_value!(version) }

    context 'when the version is an known value' do
      let(:version) { SeriesEnum::VERSION_MAP.keys.sample }

      it 'returns a version value' do
        expect(subject).to eq SeriesEnum::VERSION_MAP[version]
      end
    end

    context 'when the version is an unknown value' do
      let(:version) { '__unknown__' }

      it { expect { subject }.to raise_error IIDXIO::UnknownVersionError }
    end
  end

  describe '.find_version!' do
    subject { described_class.find_version!(value) }

    context 'when the value is an known version' do
      let(:value) { SeriesEnum::VERSION_MAP.values.sample }

      it 'returns a version' do
        expect(subject).to eq SeriesEnum::VERSION_MAP.key(value)
      end
    end

    context 'when the value is an unknown version' do
      let(:value) { -1 }

      it { expect { subject }.to raise_error IIDXIO::UnknownVersionError }
    end
  end
end
