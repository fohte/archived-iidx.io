# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Textage::Parser::TitleTable do
  describe '#parse' do
    context 'when the music is released in the AC' do
      subject do
        described_class.parse(<<~JS)
          titletbl = { _mei: [12, 1258, 1, 'HUMAN SEQUENCER', 'Amuro vs Killer', '冥'] }
        JS
      end

      it {
        is_expected.to eq(
          _mei: {
            version: 12,
            genre: 'HUMAN SEQUENCER',
            artist: 'Amuro vs Killer',
            title: '冥',
            subtitle: '',
          },
        )
      }
    end

    context 'when the music is not released in the AC' do
      subject do
        described_class.parse(<<~JS)
          titletbl = { '321star5': [0, 3901, 1, 'TECHNO POP', 'DJ SIMON', '321 STARS'] }
        JS
      end

      it { is_expected.to eq({}) }
    end

    context 'with a dummy title' do
      subject do
        described_class.parse(<<~JS)
          titletbl = { __dmy__: [99, 4095, 0, '', '', '　'] }
        JS
      end

      it { is_expected.to eq({}) }
    end

    context 'with a subtitle' do
      subject do
        described_class.parse(<<~JS)
          titletbl = {
            usualday: [
              25,
              4009,
              1,
              'DANCE POP',
              'ota2',
              'Usual Days',
              '-remix',
            ],
          }
        JS
      end

      it {
        is_expected.to eq(
          usualday: {
            version: 25,
            genre: 'DANCE POP',
            artist: 'ota2',
            title: 'Usual Days',
            subtitle: '-remix',
          },
        )
      }
    end

    context 'when the title includes some html tags' do
      subject do
        described_class.parse(<<~JS)
          titletbl = {
            usualday: [
              25,
              4009,
              1,
              'DANCE POP',
              'ota2',
              'Usual Days'.fontcolor('#ff8000'),
              '-remix',
            ],
          }
        JS
      end

      it {
        is_expected.to eq(
          usualday: {
            version: 25,
            genre: 'DANCE POP',
            artist: 'ota2',
            title: 'Usual Days',
            subtitle: '-remix',
          },
        )
      }
    end

    context 'when the subtitle includes some html tags' do
      subject do
        described_class.parse(<<~JS)
          titletbl = {
            usualday: [
              25,
              4009,
              1,
              'DANCE POP',
              'ota2',
              'Usual Days',
              '<br>-remix'.fontcolor('#ff8000'),
            ],
          }
        JS
      end

      it {
        is_expected.to eq(
          usualday: {
            version: 25,
            genre: 'DANCE POP',
            artist: 'ota2',
            title: 'Usual Days',
            subtitle: '-remix',
          },
        )
      }
    end
  end
end
