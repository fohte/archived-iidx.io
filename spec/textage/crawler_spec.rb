# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Textage::Crawler do
  let(:described_instance) { described_class.new }

  before do
    stub_request(:get, 'textage.cc/score/actbl.js').to_return(body: <<~JS)
      A = 10; B = 11; C = 12; D = 13; E = 14; F = 15;
      actbl = { a_amuro: [1, 0, 0, 3, 1, 6, 7, A, 7, C, 7, 0, 0, 0, 0, 8, 7, B, 7, C, 7, 0, 0] }
    JS

    stub_request(:get, 'textage.cc/score/titletbl.js').to_return(body: <<~JS)
      titletbl = { a_amuro: [7, 703, 1, 'RENAISSANCE', 'D.J.Amuro', 'A'] }
    JS

    stub_request(:get, 'textage.cc/score/7/a_amuro.html').to_return(
      body: Rails.root.join('spec', 'fixtures', 'textage_responses', 'a_amuro.html').read,
    )
  end

  describe '#crawl_musics_each' do
    subject { described_instance.crawl_musics_each }

    it { is_expected.to be_a Enumerator }

    it 'returns musics' do
      is_expected.to contain_exactly have_attributes(
        name: 'A',
        sub_name: '',
        genre: 'RENAISSANCE',
        artist: 'D.J.Amuro',
        textage_uid: 'a_amuro',
        series: '7th_style',
        leggendaria: false,
      )
    end

    it 'includes maps' do
      is_expected.to contain_exactly have_attributes(
        maps: contain_exactly(
          have_attributes(
            num_notes: 666,
            level: 6,
            play_style: 'sp',
            difficulty: 'normal',
            min_bpm: 93,
            max_bpm: 191,
          ),
          have_attributes(
            num_notes: 1111,
            level: 10,
            play_style: 'sp',
            difficulty: 'hyper',
            min_bpm: 93,
            max_bpm: 191,
          ),
          have_attributes(
            num_notes: 1260,
            level: 12,
            play_style: 'sp',
            difficulty: 'another',
            min_bpm: 93,
            max_bpm: 191,
          ),
          have_attributes(
            num_notes: 613,
            level: 8,
            play_style: 'dp',
            difficulty: 'normal',
            min_bpm: 93,
            max_bpm: 191,
          ),
          have_attributes(
            num_notes: 1119,
            level: 11,
            play_style: 'dp',
            difficulty: 'hyper',
            min_bpm: 93,
            max_bpm: 191,
          ),
          have_attributes(
            num_notes: 1343,
            level: 12,
            play_style: 'dp',
            difficulty: 'another',
            min_bpm: 93,
            max_bpm: 191,
          ),
        ),
      )
    end
  end
end
