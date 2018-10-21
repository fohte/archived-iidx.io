# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Music do
  include_examples 'SeriesEnum'

  describe '.search' do
    subject do
      described_class.search(
        series: attributes[:series],
        title: attributes[:title],
        genre: attributes[:genre],
        artist: attributes[:artist],
      )
    end

    shared_examples 'search a music' do
      it 'returns a search result' do
        expect(subject).to eq music
      end
    end

    context 'without sub titles' do
      let!(:music) do
        create(
          :music,
          title: 'title',
          sub_title: '',
          genre: attributes[:genre],
          artist: attributes[:artist],
          series: attributes[:series],
        )
      end

      let(:attributes) { attributes_for(:music, title: 'title') }

      include_examples 'search a music'
    end

    context 'with a whitespace and a sub title' do
      let!(:music) do
        create(
          :music,
          title: 'title',
          sub_title: '(sub title)',
          genre: attributes[:genre],
          artist: attributes[:artist],
          series: attributes[:series],
        )
      end

      let(:attributes) { attributes_for(:music, title: 'title (sub title)') }

      include_examples 'search a music'
    end

    context 'with no whitespaces and a sub title' do
      let!(:music) do
        create(
          :music,
          title: 'title',
          sub_title: '(sub title)',
          genre: attributes[:genre],
          artist: attributes[:artist],
          series: attributes[:series],
        )
      end

      let(:attributes) { attributes_for(:music, title: 'title(sub title)') }

      include_examples 'search a music'
    end

    context 'when there are no hit musics' do
      let(:attributes) { attributes_for(:music) }

      it 'does not returns musics' do
        expect(subject).to be_nil
      end
    end
  end

  describe '.fetch_map_types' do
    subject { described_class.fetch_map_types }

    before do
      create(:music, textage_uid: :test_uid, maps: maps)
    end

    context 'with no maps' do
      let(:maps) { [] }

      it 'dose not return the music' do
        expect(subject).to eq({})
      end
    end

    context 'with all maps' do
      let(:maps) do
        Map.types.map do |ps, d|
          build(:map, play_style: ps, difficulty: d)
        end
      end

      it 'returns the map types with textage_uid' do
        expect(subject).to eq(
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
        expect(subject).to contain_exactly(*Map.types)
      end
    end

    context 'with missing maps' do
      let(:maps) do
        Map.difficulty.values.map do |difficulty|
          build(:map, play_style: :sp, difficulty: difficulty)
        end
      end

      it 'returns no types' do
        expect(subject).to contain_exactly(
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
        expect(subject).to be_empty
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

  Map.types.each do |play_style, difficulty|
    describe "##{play_style}_#{difficulty}" do
      subject { music.public_send(:"#{play_style}_#{difficulty}") }

      let(:music) { create(:music) }

      context 'when there is a map' do
        let!(:map) { create(:map, music: music, play_style: play_style, difficulty: difficulty) }

        it { is_expected.to eq map }
      end

      context 'when there are no maps' do
        it { is_expected.to be nil }
      end
    end
  end
end
