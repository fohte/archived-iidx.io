# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Textage::Pages::ACTable::Map do
  describe '#exist_bms?' do
    subject { described_class.new(meta_bit: meta_bit).exist_bms? }

    context 'when first meta bit is 1' do
      let(:meta_bit) { 0b0001 }

      it { is_expected.to be_truthy }
    end

    context 'when first meta bit is 0' do
      let(:meta_bit) { 0b0000 }

      it { is_expected.to be_falsy }
    end
  end

  describe '#textage_leveling?' do
    subject { described_class.new(meta_bit: meta_bit).textage_leveling? }

    context 'when second meta bit is 1' do
      let(:meta_bit) { 0b0010 }

      it { is_expected.to be_falsy }
    end

    context 'when second meta bit is 0' do
      let(:meta_bit) { 0b0000 }

      it { is_expected.to be_truthy }
    end
  end

  describe '#cn?' do
    subject { described_class.new(meta_bit: meta_bit).cn? }

    context 'when forth meta bit is 1' do
      let(:meta_bit) { 0b1000 }

      it { is_expected.to be_truthy }
    end

    context 'when forth meta bit is 0' do
      let(:meta_bit) { 0b0000 }

      it { is_expected.to be_falsy }
    end
  end

  describe '#hcn?' do
    subject { described_class.new(meta_bit: meta_bit, sub_data: sub_data).hcn? }

    let(:sub_data) { nil }

    context 'when forth meta bit is 1' do
      let(:meta_bit) { 0b1000 }

      context 'when sub_data is an empty string' do
        let(:sub_data) { '' }

        it { is_expected.to be_truthy }
      end

      context 'when sub_data is nil' do
        let(:sub_data) { nil }

        it { is_expected.to be_falsy }
      end

      context 'when sub_data is some string' do
        let(:sub_data) { '(test)' }

        it { is_expected.to be_falsy }
      end
    end

    context 'when forth meta bit is 0' do
      let(:meta_bit) { 0b0000 }

      it { is_expected.to be_falsy }
    end
  end
end
