# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Music do
  describe '.fetch_map_types' do
    subject { described_class.fetch_map_types }

    before do
      create(:music, textage_uid: :test_uid, maps: maps)
    end

    context 'with no maps' do
      let(:maps) { [] }

      it 'dose not return the music' do
        is_expected.to eq({})
      end
    end

    context 'with all maps' do
      let(:maps) do
        Map.types.map do |ps, d|
          build(:map, play_style: ps, difficulty: d)
        end
      end

      it 'returns the map types with textage_uid' do
        is_expected.to eq(
          test_uid: [
            [Map.play_style.sp, Map.difficulty.normal],
            [Map.play_style.sp, Map.difficulty.hyper],
            [Map.play_style.sp, Map.difficulty.another],
            [Map.play_style.dp, Map.difficulty.normal],
            [Map.play_style.dp, Map.difficulty.hyper],
            [Map.play_style.dp, Map.difficulty.another],
          ],
        )
      end
    end
  end

  describe '#missing_map_types' do
    subject { music.missing_map_types }

    let(:music) { create(:music, maps: maps) }

    context 'with no maps' do
      let(:maps) { [] }

      it 'returns all types' do
        is_expected.to contain_exactly(*Map.types)
      end
    end

    context 'with missing maps' do
      let(:maps) do
        Map.difficulty.values.map do |difficulty|
          build(:map, play_style: :sp, difficulty: difficulty)
        end
      end

      it 'returns no types' do
        is_expected.to contain_exactly(
          [Map.play_style.dp, Map.difficulty.normal],
          [Map.play_style.dp, Map.difficulty.hyper],
          [Map.play_style.dp, Map.difficulty.another],
        )
      end
    end

    context 'with all maps' do
      let(:maps) do
        Map.types.map do |play_style, difficulty|
          build(:map, play_style: play_style, difficulty: difficulty)
        end
      end

      it 'returns no types' do
        is_expected.to be_empty
      end
    end
  end

  describe '#miss_maps?' do
    subject { music.miss_maps? }

    let(:music) { create(:music, maps: maps) }

    context 'with no maps' do
      let(:maps) { [] }

      it { is_expected.to be_truthy }
    end

    context 'with missing maps' do
      let(:maps) do
        Map.difficulty.values.map do |difficulty|
          build(:map, play_style: :sp, difficulty: difficulty)
        end
      end

      it { is_expected.to be_truthy }
    end

    context 'with all maps' do
      let(:maps) do
        Map.types.map do |play_style, difficulty|
          build(:map, play_style: play_style, difficulty: difficulty)
        end
      end

      it { is_expected.to be_falsy }
    end
  end
end
