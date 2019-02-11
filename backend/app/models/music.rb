# frozen_string_literal: true

class Music < ApplicationRecord
  include SeriesEnum

  has_many :maps, dependent: :destroy, autosave: true

  scope :by_title, ->(title) do
    where('concat(title, sub_title) = ?', title)
      .or(where(%{concat(title, ' ', sub_title) = ?}, title))
  end

  scope :fuzzy_search_by_title, ->(title) do
    sanitized_title = "%#{sanitize_sql_like(title)}%"
    Music
      .where(Music.arel_table[:title].matches(sanitized_title))
      .or(Music.where(Music.arel_table[:sub_title].matches(sanitized_title)))
  end

  def self.search(series:, title:, genre:, artist:)
    by_title(title).find_by(
      series: series,
      genre: genre,
      artist: artist,
    )
  end

  # @param row [IIDXIO::CSVParser::Row]
  # @return [::Music, nil]
  def self.identify_from_csv(row)
    search(
      series: find_version_value!(row.version),
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
