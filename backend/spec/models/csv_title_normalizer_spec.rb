# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CSVTitleNormalizer do
  describe '.normalize' do
    subject { described_class.normalize(title) }

    {
      'ÆTHER' => 'ATHER',

      'ROCK女 feat. 大山愛未, Ken' => 'ROCK女 feat. 大山愛未， Ken',

      # wave dash (U+301C) => fullwidth tilde (U+FF5E)
      'ZETA〜素数の世界と超越者〜' => 'ZETA～素数の世界と超越者～',

      'Punch Love ♥ 仮面' => 'Punch Love 仮面',
      'ギョギョっと人魚♨爆婚ブライダル' => 'ギョギョっと人魚 爆婚ブライダル',
    }.each do |title, want|
      context "with #{title}" do
        let(:title) { title }

        it { is_expected.to eq(want) }
      end
    end
  end
end
