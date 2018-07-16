# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Textage::Pages::ACTable::MapTable do
  describe '#ac?' do
    subject { described_class.new(release_status: 1).ac? }

    it { is_expected.to be_truthy }
  end

  describe '#cs?' do
    subject { described_class.new(release_status: 2).cs? }

    it { is_expected.to be_truthy }
  end

  describe '#not_released?' do
    subject { described_class.new(release_status: 3).not_released? }

    it { is_expected.to be_truthy }
  end

  describe '.from_raw_array' do
    subject do
      described_class.from_raw_array(
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
      is_expected.to have_attributes(
        release_status: described_class.release_status.ac,
        sp_old_beginner: have_attributes(level: 0, meta_bit: 0, sub_data: ''),
        sp_beginner: have_attributes(level: 3, meta_bit: 1, sub_data: ''),
        sp_normal: have_attributes(level: 6, meta_bit: 7, sub_data: ''),
        sp_hyper: have_attributes(level: 10, meta_bit: 7, sub_data: ''),
        sp_another: have_attributes(level: 12, meta_bit: 7, sub_data: ''),
        sp_black_another: have_attributes(level: 0, meta_bit: 0, sub_data: ''),
        dp_beginner: have_attributes(level: 0, meta_bit: 0, sub_data: ''),
        dp_normal: have_attributes(level: 8, meta_bit: 7, sub_data: ''),
        dp_hyper: have_attributes(level: 11, meta_bit: 7, sub_data: ''),
        dp_another: have_attributes(level: 12, meta_bit: 7, sub_data: ''),
        dp_black_another: have_attributes(level: 0, meta_bit: 0, sub_data: ''),
      )
    end
  end
end
