# frozen_string_literal: true

class Music < ApplicationRecord
  include SeriesEnum

  has_many :maps, dependent: :destroy, autosave: true

  scope :fuzzy_search_by_title, ->(title) do
    sanitized_title = "%#{sanitize_sql_like(title)}%"
    Music.where(Music.arel_table[:title].matches(sanitized_title))
  end

  def self.search(series:, title:, genre:, artist:)
    where(title: title).find_by(
      series: series,
      genre: genre,
      artist: artist,
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

  def self.transform_as_csv_title(title)
    # halfwidth comma => fullwidth comma
    # the halfwidth comma is escaped in the CSV.
    title = title.tr(',', '，')

    # latin capital letter ae => A
    title = title.tr('Æ', 'A')

    # remove the non Shift_JIS characters
    title = title.encode('Shift_JIS', invalid: :replace, undef: :replace, replace: '').encode('UTF-8')

    # wave dash (U+301C) => fullwidth tilde (U+FF5E)
    # the fullwidth tilde (U+FF5E) is used in the official (e-AMUSEMENT)
    # instead of the wave dash (U+301C).
    title = title.tr('〜', '～')

    # remove two or more consecutive whitespaces
    title = title.squeeze(' ')

    title
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
      find_map(play_style, difficulty)
    end
  end

  def find_map(play_style, difficulty)
    maps.detect { |m| m.play_style == play_style && m.difficulty == difficulty }
  end
end
