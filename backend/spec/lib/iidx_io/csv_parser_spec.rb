# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIO::CSVParser do
  describe '.parse' do
    %i[rootage heroic_verse].each do |series|
      context "with #{series}" do
        subject { described_class.parse(csv, series: series) }

        context 'with a downloaded csv file from the official page' do
          let(:csv) { iidx_fixture('csv', series.to_s, 'sp_score.csv').read }

          it '行データが取得できること' do
            expect(subject.rows).not_to be_empty
          end
        end
      end
    end
  end
end
