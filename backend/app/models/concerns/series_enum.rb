# frozen_string_literal: true

module SeriesEnum
  extend ActiveSupport::Concern

  VERSION_MAP = {
    '1st&substream' => 1,
    '2nd style' => 2,
    '3rd style' => 3,
    '4th style' => 4,
    '5th style' => 5,
    '6th style' => 6,
    '7th style' => 7,
    '8th style' => 8,
    '9th style' => 9,
    '10th style' => 10,
    'IIDX RED' => 11,
    'HAPPY SKY' => 12,
    'DistorteD' => 13,
    'GOLD' => 14,
    'DJ TROOPERS' => 15,
    'EMPRESS' => 16,
    'SIRIUS' => 17,
    'Resort Anthem' => 18,
    'Lincle' => 19,
    'tricoro' => 20,
    'SPADA' => 21,
    'PENDUAL' => 22,
    'copula' => 23,
    'SINOBUZ' => 24,
    'CANNON BALLERS' => 25,
    'Rootage' => 26,
    'HEROIC VERSE' => 27,
  }.freeze

  included do
    enumerize :series, in: {
      '1st_substream': 1,
      '2nd_style': 2,
      '3rd_style': 3,
      '4th_style': 4,
      '5th_style': 5,
      '6th_style': 6,
      '7th_style': 7,
      '8th_style': 8,
      '9th_style': 9,
      '10th_style': 10,
      iidx_red: 11,
      happy_sky: 12,
      distorted: 13,
      gold: 14,
      dj_troopers: 15,
      empress: 16,
      sirius: 17,
      resort_anthem: 18,
      lincle: 19,
      tricoro: 20,
      spada: 21,
      pendual: 22,
      copula: 23,
      sinobuz: 24,
      cannon_ballers: 25,
      rootage: 26,
      heroic_verse: 27,
    }
  end

  class_methods do
    # @param version [String]
    # @return [Integer]
    def find_version_value!(version)
      VERSION_MAP.fetch(version) do
        raise IIDXIO::UnknownVersionError, "#{version} is unknown version"
      end
    end

    def find_version!(value)
      VERSION_MAP.key(value).tap do |k|
        raise IIDXIO::UnknownVersionError, "#{value} is unknown version" if k.nil?
      end
    end
  end
end
