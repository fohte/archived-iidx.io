# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIO::CSVParser::Row::FiveDifficulties do
  subject { described_class.new(csv) }

  let(:csv) do
    <<~CSV
      SPADA,Verflucht,HARD NRG,Tyrfing,4,0,0,0,0,---,NO PLAY,---,6,0,0,0,---,NO PLAY,---,10,0,0,0,---,NO PLAY,---,12,3401,1616,169,10,EX HARD CLEAR,AAA,12,4480,2127,226,29,HARD CLEAR,AAA,2019-10-20 11:09
    CSV
  end

  it 'returns attributes' do
    expect(subject).to have_attributes(
      version: 'SPADA',
      title: 'Verflucht',
      genre: 'HARD NRG',
      artist: 'Tyrfing',
      play_count: 4,
      beginner: have_attributes(
        level: nil,
        ex_score: nil,
        pgreat: nil,
        great: nil,
        miss_count: nil,
        clear_lamp: nil,
        dj_level: nil,
      ),
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
        ex_score: nil,
        pgreat: nil,
        great: nil,
        miss_count: nil,
        clear_lamp: nil,
        dj_level: nil,
      ),
      another: have_attributes(
        level: 12,
        ex_score: 3401,
        pgreat: 1616,
        great: 169,
        miss_count: 10,
        clear_lamp: 'EX HARD CLEAR',
        dj_level: 'AAA',
      ),
      leggendaria: have_attributes(
        level: 12,
        ex_score: 4480,
        pgreat: 2127,
        great: 226,
        miss_count: 29,
        clear_lamp: 'HARD CLEAR',
        dj_level: 'AAA',
      ),
      last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2019, 10, 20, 11, 9, 0) },
    )
  end
end
