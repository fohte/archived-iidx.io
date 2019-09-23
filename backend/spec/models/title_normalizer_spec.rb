# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TitleNormalizer do
  describe '.as_csv_title' do
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
      'ZETA〜素数の世界と超越者〜' => 'ZETA ～素数の世界と超越者～',

      # サブタイトルが存在するタイプ
      'CHRONO DIVER-NORNIR-†' => 'CHRONO DIVER -NORNIR-†',
      'CODE:1[revision1.0.1]' => 'CODE:1 [revision1.0.1]',
      'Summerlights(IIDX Edition)' => 'Summerlights (IIDX Edition)',
      '†渚の小悪魔ラヴリィ～レイディオ†(IIDX EDIT)' => '†渚の小悪魔ラヴリィ～レイディオ† (IIDX EDIT)',
      '夏色DIARY - L.E.D.-G STYLE MIX -' => '夏色DIARY - L.E.D.-G STYLE MIX -',

      'Punch Love ♥ 仮面' => 'Punch Love 仮面',
      'ギョギョっと人魚♨爆婚ブライダル' => 'ギョギョっと人魚 爆婚ブライダル',

      # 変換しない
      'NΦ CRIME' => 'NΦ CRIME',
    }.each do |before_title, after_title|
      context %{正規化すべきタイトルの場合 ("#{before_title}")} do
        subject { described_class.as_csv_title(title) }

        let(:title) { before_title }

        it %("#{after_title}" に正規化する) do
          expect(subject).to eq(after_title)
        end
      end

      next if before_title == after_title

      context %{タイトルがすでに正規化されている場合 ("#{after_title}")} do
        subject { described_class.as_csv_title(title) }

        let(:title) { after_title }

        it %(正規化しても変わらない) do
          expect(subject).to eq(after_title)
        end
      end
    end

    context '実際のタイトルの場合' do
      it 'CSV スコアデータのタイトル -> Textage 上のタイトルが単射になる' do
        textage_titles = textage_fixture('titles.txt').read.split("\n")
        csv_titles = iidx_fixture('csv/titles.txt').read.split("\n")

        diff =
          csv_titles.map { |t| described_class.as_csv_title(t) } -
          textage_titles.map { |t| described_class.as_csv_title(t) }

        expect(diff).to eq []
      end
    end
  end
end
