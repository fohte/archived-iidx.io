# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Textage::Pages::ACTable::MapTable do
  subject do
    described_class.new(
      [
        1,
        0, 0,
        3, 1,
        6, 7,
        10, 7,
        12, 7,
        0, 0,
        0, 0,
        8, 7,
        11, 7,
        12, 7,
        0, 0,
        '',
      ],
    )
  end

  it do
    expect(subject).to have_attributes(
      release_status: :ac,
      sp_old_beginner: have_attributes(level: 0, meta_bit: 0, sub_data: ''),
      sp_beginner: have_attributes(level: 3, meta_bit: 1, sub_data: ''),
      sp_normal: have_attributes(level: 6, meta_bit: 7, sub_data: ''),
      sp_hyper: have_attributes(level: 10, meta_bit: 7, sub_data: ''),
      sp_another: have_attributes(level: 12, meta_bit: 7, sub_data: ''),
      sp_leggendaria: have_attributes(level: 0, meta_bit: 0, sub_data: ''),
      dp_beginner: have_attributes(level: 0, meta_bit: 0, sub_data: ''),
      dp_normal: have_attributes(level: 8, meta_bit: 7, sub_data: ''),
      dp_hyper: have_attributes(level: 11, meta_bit: 7, sub_data: ''),
      dp_another: have_attributes(level: 12, meta_bit: 7, sub_data: ''),
      dp_leggendaria: have_attributes(level: 0, meta_bit: 0, sub_data: ''),
    )
  end
end
