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
    }.each do |before_title, after_title|
      context %{正規化すべきタイトルの場合 ("#{before_title}")} do
        let(:title) { before_title }

        it %("#{after_title}" に正規化する) do
          expect(subject).to eq(after_title)
        end
      end

      next if before_title == after_title

      context %{タイトルがすでに正規化されている場合 ("#{after_title}")} do
        let(:title) { after_title }

        it %(正規化しても変わらない) do
          expect(subject).to eq(after_title)
        end
      end
    end
  end
end
