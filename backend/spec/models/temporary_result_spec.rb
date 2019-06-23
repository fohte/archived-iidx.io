# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TemporaryResult do
  include_examples 'ClearLampEnum'
  include_examples 'GradeEnum'

  describe '.bulk_convert_to_result' do
    let(:user) { create(:user) }
    let(:result_batch) { create(:result_batch, user: user) }

    let(:temporary_result) do
      create(:temporary_result, user: user, result_batch: result_batch)
    end

    context 'when the map and music exist' do
      let!(:music) { create(:music, csv_title: temporary_result.title) }
      let!(:map) { create(:map, music: music, play_style: temporary_result.play_style, difficulty: temporary_result.difficulty) }

      before do
        described_class.bulk_convert_to_result
      end

      it 'creates a result' do
        expect(Result.last).to have_attributes(
          user: user,
          result_batch: result_batch,
          map: map,
          score: temporary_result.score,
          miss_count: temporary_result.miss_count,
          clear_lamp: temporary_result.clear_lamp,
          grade: temporary_result.grade,
          last_played_at: temporary_result.last_played_at,
        )
      end

      it 'deletes the temporary result' do
        expect { described_class.find(temporary_result.id) }.to raise_error ActiveRecord::RecordNotFound
      end
    end

    context 'when the map does not exist but the music exists' do
      let!(:music) { create(:music, csv_title: temporary_result.title) }

      it 'does not create results' do
        expect { described_class.bulk_convert_to_result }.not_to change(Result, :count)
      end

      it 'does not delete the temporary result' do
        described_class.bulk_convert_to_result
        expect(described_class.find(temporary_result.id)).to eq temporary_result
      end
    end

    context 'when the music and map don\'t not exist' do
      it 'does not create results' do
        expect { described_class.bulk_convert_to_result }.not_to change(Result, :count)
      end

      it 'does not delete the temporary result' do
        described_class.bulk_convert_to_result
        expect(described_class.find(temporary_result.id)).to eq temporary_result
      end
    end
  end

  describe '#to_result' do
    subject(:result) { temporary_result.to_result }

    let(:user) { build(:user) }
    let(:result_batch) { build(:result_batch, user: user) }

    let(:temporary_result) do
      build(:temporary_result, user: user, result_batch: result_batch)
    end

    context 'when the map and music exist' do
      let!(:music) { create(:music, csv_title: temporary_result.title) }
      let!(:map) { create(:map, music: music, play_style: temporary_result.play_style, difficulty: temporary_result.difficulty) }

      it 'returns a result' do
        expect(result).to have_attributes(
          user: user,
          result_batch: result_batch,
          map: map,
          score: temporary_result.score,
          miss_count: temporary_result.miss_count,
          clear_lamp: temporary_result.clear_lamp,
          grade: temporary_result.grade,
          last_played_at: temporary_result.last_played_at,
        )
      end
    end

    context 'when the map does not exist but the music exists' do
      let!(:music) { create(:music, csv_title: temporary_result.title) }

      it { is_expected.to be_nil }
    end

    context 'when the music and map don\'t exist' do
      it { is_expected.to be_nil }
    end
  end
end
