# typed: false
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
          ex_score: nil,
          pgreat: nil,
          great: nil,
          miss_count: nil,
          clear_lamp: nil,
          dj_level: nil,
        ),
        hyper: have_attributes(
          level: 11,
          ex_score: nil,
          pgreat: nil,
          great: nil,
          miss_count: nil,
          clear_lamp: nil,
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

    context 'when results are not played in any version but they are played in previous version' do
      let(:csv) do
        <<~CSV
          copula,AO-1,DANCE EXPRESS,電龍,0,7,0,0,0,---,NO PLAY,---,10,0,0,0,---,NO PLAY,---,12,0,0,0,---,EX HARD CLEAR,---,2018-11-07 19:48
        CSV
      end

      it 'returns attributes' do
        expect(subject).to have_attributes(
          version: 'copula',
          title: 'AO-1',
          genre: 'DANCE EXPRESS',
          artist: '電龍',
          play_count: 0,
          normal: have_attributes(
            level: 7,
            ex_score: nil,
            pgreat: nil,
            great: nil,
            miss_count: nil,
            clear_lamp: nil,
            dj_level: nil,
          ),
          hyper: have_attributes(
            level: 10,
            ex_score: nil,
            pgreat: nil,
            great: nil,
            miss_count: nil,
            clear_lamp: nil,
            dj_level: nil,
          ),
          another: have_attributes(
            level: 12,
            ex_score: nil,
            pgreat: nil,
            great: nil,
            miss_count: nil,
            clear_lamp: 'EX HARD CLEAR',
            dj_level: nil,
          ),
          last_played_at: Time.zone.local(2018, 11, 7, 19, 48, 0),
        )
      end
    end

    context 'when results are played in the 段位認定 mode only' do
      let(:csv) do
        <<~CSV
          SPADA,疾風迅雷,ORIENTAL CORE,KUMOKIRI,1,6,0,0,0,---,NO PLAY,---,10,1885,839,207,5,NO PLAY,AA,12,0,0,0,---,NO PLAY,---,2018-11-07 20:10
        CSV
      end

      it 'returns attributes' do
        expect(subject).to have_attributes(
          version: 'SPADA',
          title: '疾風迅雷',
          genre: 'ORIENTAL CORE',
          artist: 'KUMOKIRI',
          play_count: 1,
          normal: have_attributes(
            level: 6,
            ex_score: nil,
            pgreat: nil,
            great: nil,
            miss_count: nil,
            clear_lamp: nil,
            dj_level: nil,
          ),
          hyper: have_attributes(
            level: 10,
            ex_score: 1885,
            pgreat: 839,
            great: 207,
            miss_count: 5,
            clear_lamp: nil,
            dj_level: 'AA',
          ),
          another: have_attributes(
            level: 12,
            ex_score: nil,
            pgreat: nil,
            great: nil,
            miss_count: nil,
            clear_lamp: nil,
            dj_level: nil,
          ),
          last_played_at: Time.zone.local(2018, 11, 7, 20, 10, 0),
        )
      end
    end
  end
end
