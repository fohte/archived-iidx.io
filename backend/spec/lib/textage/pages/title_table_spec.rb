# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Textage::Pages::TitleTable do
  let(:loader) { Textage::Loader.new(cache: ActiveSupport::Cache::MemoryStore.new) }

  let(:described_instance) { described_class.new(loader: loader) }

  before do
    stub_request(:get, 'textage.cc/score/titletbl.js').to_return(body: titletbl_js)
  end

  describe '#musics' do
    subject { described_instance.musics }

    context 'when the music is released in the AC' do
      let(:titletbl_js) do
        <<~JS
          titletbl = { _mei: [12, 1258, 1, 'HUMAN SEQUENCER', 'Amuro vs Killer', '冥'] }
        JS
      end

      it 'returns musics' do
        expect(subject).to match(
          _mei: have_attributes(
            version: 12,
            genre: 'HUMAN SEQUENCER',
            artist: 'Amuro vs Killer',
            title: '冥',
            sub_title: '',
          ),
        )
      end
    end

    context 'when the music is not released in the AC' do
      let(:titletbl_js) do
        <<~JS
          titletbl = { '321star5': [0, 3901, 1, 'TECHNO POP', 'DJ SIMON', '321 STARS'] }
        JS
      end

      it 'does not return musics' do
        expect(subject).to be_empty
      end
    end

    context 'with a dummy title' do
      let(:titletbl_js) do
        <<~JS
          titletbl = { __dmy__: [99, 4095, 0, '', '', '　'] }
        JS
      end

      it 'does not return musics' do
        expect(subject).to be_empty
      end
    end

    context 'with a subtitle' do
      let(:titletbl_js) do
        <<~JS
          titletbl = { usualday: [25, 4009, 1, 'DANCE POP', 'ota2', 'Usual Days', '-remix'] }
        JS
      end

      it 'returns musics' do
        expect(subject).to match(
          usualday: have_attributes(
            version: 25,
            genre: 'DANCE POP',
            artist: 'ota2',
            title: 'Usual Days',
            sub_title: '-remix',
          ),
        )
      end
    end

    context 'when the title includes some html tags' do
      let(:titletbl_js) do
        <<~JS
          titletbl = { usualday: [25, 4009, 1, 'DANCE POP', 'ota2', 'Usual Days'.fontcolor('#ff8000'), '-remix'] }
        JS
      end

      it 'returns musics' do
        expect(subject).to match(
          usualday: have_attributes(
            version: 25,
            genre: 'DANCE POP',
            artist: 'ota2',
            title: 'Usual Days',
            sub_title: '-remix',
          ),
        )
      end
    end

    context 'when the subtitle includes some html tags' do
      let(:titletbl_js) do
        <<~JS
          titletbl = { usualday: [25, 4009, 1, 'DANCE POP', 'ota2', 'Usual Days', '<br>-remix'.fontcolor('#ff8000') ] }
        JS
      end

      it 'returns musics' do
        expect(subject).to match(
          usualday: have_attributes(
            version: 25,
            genre: 'DANCE POP',
            artist: 'ota2',
            title: 'Usual Days',
            sub_title: '-remix',
          ),
        )
      end
    end
  end
end
