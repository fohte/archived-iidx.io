# frozen_string_literal: true

class Music < ApplicationRecord
  has_many :maps, dependent: :destroy, autosave: true

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
  }

  # @param row [IIDXIO::CSVParser::Row]
  # @return [::Music]
  def self.identify_from_csv(row)
    MusicSearchCache.search(
      version: row.version,
      title: row.title,
      genre: row.genre,
      artist: row.artist,
    )
  end

  def self.fetch_map_types
    {}.tap do |h|
      joins(:maps)
        .pluck(:textage_uid, 'maps.play_style', 'maps.difficulty')
        .each do |uid, ps, d|
        (h[uid.to_sym] ||= []) << [
          Map.play_style.find_value(ps),
          Map.difficulty.find_value(d),
        ]
      end
    end
  end

  def map_types
    maps.pluck(:play_style, :difficulty)
  end

  def missing_map_types
    ::Map.types - map_types
  end

  def miss_maps?
    !missing_map_types.empty?
  end

  Map.types.each do |play_style, difficulty|
    define_method(:"#{play_style}_#{difficulty}") do
      maps.detect { |m| m.play_style == play_style && m.difficulty == difficulty }
    end
  end
end
