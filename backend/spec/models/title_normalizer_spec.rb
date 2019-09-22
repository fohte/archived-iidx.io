# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TitleNormalizer do
  describe '.as_csv_title' do
    subject { described_class.as_csv_title(title) }

    {
      'ÆTHER' => 'ATHER',
      'Amor De Verão' => 'Amor De Verao',
      'CODE:Ø' => 'CODE:0',
      'Geirskögul' => 'Geirskogul',
      'Mächö Mönky' => 'Macho Monky',
      'Übertreffen' => 'Ubertreffen',
      'Χ-DEN' => 'X-DEN',
      '焱影' => '炎影',

      'ROCK女 feat. 大山愛未, Ken' => 'ROCK女 feat. 大山愛未， Ken',

      # wave dash (U+301C) => fullwidth tilde (U+FF5E)
      'ZETA〜素数の世界と超越者〜' => 'ZETA～素数の世界と超越者～',

      'Punch Love ♥ 仮面' => 'Punch Love 仮面',
      'ギョギョっと人魚♨爆婚ブライダル' => 'ギョギョっと人魚 爆婚ブライダル',

      # 変換しない
      'NΦ CRIME' => 'NΦ CRIME',
    }.each do |title, want|
      context "with #{title}" do
        let(:title) { title }

        it { is_expected.to eq(want) }
      end
    end
  end
end
