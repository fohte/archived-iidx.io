# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIO::CSVParser do
  describe '.parse' do
    subject { described_class.parse(csv) }

    context 'with a downloaded csv file from the official page' do
      let(:csv) { iidx_fixture('csv', 'sp_score.csv').read }

      it { is_expected.to be_a described_class::Table }

      it 'includes as many rows as the line of files except the header line' do
        expect(subject.rows.length).to eq(csv.lines.length - 1)
      end
    end
  end
end
