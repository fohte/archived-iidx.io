# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Music do
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
end
