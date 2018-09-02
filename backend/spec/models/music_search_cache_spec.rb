# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MusicSearchCache do
  describe '.search' do
    subject { described_class.search(**attributes) }

    context 'when there is a record and it belongs to music' do
      let(:music) { create(:music) }
      let!(:music_search_cache) { create(:music_search_cache, **attributes, music: music) }
      let(:attributes) { attributes_for(:music_search_cache) }

      it 'returns the hit music model' do
        expect(subject).to eq music
      end
    end

    shared_context 'without sub titles' do
      let!(:music) do
        create(
          :music,
          title: 'title',
          sub_title: '',
          genre: attributes[:genre],
          artist: attributes[:artist],
          series: described_class.find_version_value!(attributes[:version]),
        )
      end

      let(:attributes) { attributes_for(:music_search_cache, title: 'title') }
    end

    shared_context 'with a whitespace and a sub title' do
      let!(:music) do
        create(
          :music,
          title: 'title',
          sub_title: '(sub title)',
          genre: attributes[:genre],
          artist: attributes[:artist],
          series: described_class.find_version_value!(attributes[:version]),
        )
      end

      let(:attributes) { attributes_for(:music_search_cache, title: 'title (sub title)') }
    end

    shared_context 'with no whitespaces and a sub title' do
      let!(:music) do
        create(
          :music,
          title: 'title',
          sub_title: '(sub title)',
          genre: attributes[:genre],
          artist: attributes[:artist],
          series: described_class.find_version_value!(attributes[:version]),
        )
      end

      let(:attributes) { attributes_for(:music_search_cache, title: 'title(sub title)') }
    end

    context 'when there is a record but it dose not belong to music' do
      let!(:music_search_cache) do
        create(:music_search_cache, **attributes)
      end

      shared_examples 'search a music' do
        it 'returns a search result of music model' do
          expect(subject).to eq music
        end

        it 'saves a music id to the record' do
          subject
          expect(music_search_cache.reload.music).to eq music
        end
      end

      context 'without sub titles' do
        include_context 'without sub titles'
        include_examples 'search a music'
      end

      context 'with a whitespace and a sub title' do
        include_context 'with a whitespace and a sub title'
        include_examples 'search a music'
      end

      context 'with no whitespaces and a sub title' do
        include_context 'with no whitespaces and a sub title'
        include_examples 'search a music'
      end
    end

    context 'when there are no records' do
      shared_examples 'search a music' do
        it 'returns a search result of music model' do
          expect(subject).to eq music
        end

        it 'inserts a new record with the music' do
          subject
          expect(described_class.last).to have_attributes(**attributes, music: music)
        end
      end

      context 'without sub titles' do
        include_context 'without sub titles'
        include_examples 'search a music'
      end

      context 'with a whitespace and a sub title' do
        include_context 'with a whitespace and a sub title'
        include_examples 'search a music'
      end

      context 'with no whitespaces and a sub title' do
        include_context 'with no whitespaces and a sub title'
        include_examples 'search a music'
      end
    end

    context 'when the version is an unknown value' do
      let(:attributes) { attributes_for(:music_search_cache, version: '__unknown__') }

      it { expect { subject }.to raise_error IIDXIO::UnknownVersionError }
    end
  end
end
