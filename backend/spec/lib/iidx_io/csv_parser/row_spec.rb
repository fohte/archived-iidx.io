# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIO::CSVParser::Row do
  describe '.from_csv' do
    subject { described_class.from_csv(csv) }

    let(:csv) do
      <<~CSV
        SIRIUS,Almagest,AKASHIC RECORDS,Galdeira,22,7,0,0,0,---,NO PLAY,---,11,0,0,0,---,NO PLAY,---,12,2868,1293,282,11,EX HARD CLEAR,AA,2018-08-21 20:56
      CSV
    end

    it 'returns attributes' do
      expect(subject).to have_attributes(
        version: 'SIRIUS',
        title: 'Almagest',
        genre: 'AKASHIC RECORDS',
        artist: 'Galdeira',
        play_count: 22,
        normal: have_attributes(
          level: 7,
          ex_score: 0,
          pgreat: 0,
          great: 0,
          miss_count: 0,
          clear_lamp: 'NO PLAY',
          dj_level: nil,
        ),
        hyper: have_attributes(
          level: 11,
          ex_score: 0,
          pgreat: 0,
          great: 0,
          miss_count: 0,
          clear_lamp: 'NO PLAY',
          dj_level: nil,
        ),
        another: have_attributes(
          level: 12,
          ex_score: 2868,
          pgreat: 1293,
          great: 282,
          miss_count: 11,
          clear_lamp: 'EX HARD CLEAR',
          dj_level: 'AA',
        ),
        last_played_at: Time.zone.local(2018, 8, 21, 20, 56, 0),
      )
    end
  end
end
