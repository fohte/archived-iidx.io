# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TemporaryResultConverter do
  let(:described_instance) { described_class.new }

  describe '.convert' do
    let(:user) { create(:user) }
    let(:result_batch) { create(:result_batch, user: user) }

    let(:temporary_result) do
      create(
        :temporary_result,
        user: user,
        result_batch: result_batch,
        score: 3800,
      )
    end

    context 'when the map and music exist' do
      let!(:music) { create(:music, csv_title: temporary_result.title) }
      let!(:map) do
        create(
          :map,
          music: music,
          num_notes: 2000,
          play_style: temporary_result.play_style,
          difficulty: temporary_result.difficulty,
        )
      end

      before do
        described_instance.convert
      end

      it 'creates a result' do
        expect(Result.last).to have_attributes(
          user: user,
          result_batch: result_batch,
          map: map,
          score: temporary_result.score,
          grade: 'AAA',
          miss_count: temporary_result.miss_count,
          clear_lamp: temporary_result.clear_lamp,
          last_played_at: temporary_result.last_played_at,
        )
      end

      it 'deletes the temporary result' do
        expect { TemporaryResult.find(temporary_result.id) }.to raise_error ActiveRecord::RecordNotFound
      end
    end

    context 'when the map does not exist but the music exists' do
      let!(:music) { create(:music, csv_title: temporary_result.title) }

      it 'does not create results' do
        expect { described_instance.convert }.not_to change(Result, :count)
      end

      it 'does not delete the temporary result' do
        described_instance.convert
        expect(TemporaryResult.find(temporary_result.id)).to eq temporary_result
      end
    end

    context 'when the music and map don\'t not exist' do
      it 'does not create results' do
        expect { described_instance.convert }.not_to change(Result, :count)
      end

      it 'does not delete the temporary result' do
        described_instance.convert
        expect(TemporaryResult.find(temporary_result.id)).to eq temporary_result
      end
    end
  end
end
