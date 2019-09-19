# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CSVTitleNormalizer do
  describe '.normalize' do
    subject { described_class.normalize(title) }

    context 'with the wave dashes (U+301C)' do
      # wave dash (U+301C)
      let(:title) { "\u{301c}" }

      it { is_expected.to eq("\u{ff5e}") }
    end

    context 'with the halfwidth commas' do
      let(:title) { ',' }

      it { is_expected.to eq('，') }
    end

    context 'with the latin capital letter ae (Æ)' do
      let(:title) { 'Æ' }

      it { is_expected.to eq('A') }
    end

    context 'with non Shift_JIS characters' do
      let(:title) { '♥♨' }

      it { is_expected.to eq('') }
    end

    context 'when the transformed title has two or more consecutive whitespaces' do
      let(:title) { 'a ♥ z' }

      it { is_expected.to eq('a z') }
    end
  end
end
