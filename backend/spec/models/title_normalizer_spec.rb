# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TitleNormalizer do
  describe '.as_csv_title' do
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
