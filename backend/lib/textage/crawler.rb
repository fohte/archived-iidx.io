# frozen_string_literal: true

module Textage
  class Crawler
    attr_accessor :loader

    # @param kwargs [Hash] keyword arguments for initializer of Loader
    def initialize(**kwargs)
      @loader = Loader.new(**kwargs)
    end

    # @return [Enumerator<::Music>]
    def crawl_musics_each
      delta_map_types.each.lazy.reject { |_, types_list| types_list.empty? }.map do |uid, types_list|
        music_table = title_table.musics[uid]

        (::Music.find_by(textage_uid: uid) || build_music(music_table, uid)).tap do |m|
          map_table = ac_table.map_tables[uid]
          score_page = fetch_score_page(music_table.version, uid)

          types_list.each do |ps, d|
            ps = ps.to_s.to_sym
            d = d.to_s.to_sym

            map = map_table.fetch_map(ps, d)
            next unless map.exist_bms?

            bms = score_page.bms(play_style: ps, difficulty: d)

            m.maps.build(
              num_notes: bms.notes,
              level: map.level,
              play_style: ps,
              difficulty: d,
              min_bpm: score_page.bpm.min,
              max_bpm: score_page.bpm.max,
            )
          end
        end
      end
    end

    private

    def title_table
      @title_table ||= Pages::TitleTable.new(loader: loader)
    end

    def ac_table
      @ac_table ||= Pages::ACTable.new(loader: loader)
    end

    def fetch_score_page(textage_version, uid)
      textage_version = 's' if Textage.substream_number?(textage_version)

      Pages::Score.new(loader.fetch(Routes::Score.show(textage_version, uid)))
    end

    def build_music(music_table, uid)
      ::Music.new(
        title: music_table.model_title,
        csv_title: music_table.model_csv_title,
        genre: music_table.genre,
        artist: music_table.artist,
        textage_uid: uid,
        series: music_table.model_series,
        leggendaria: ac_table.leggendaria?(uid),
      )
    end

    def delta_map_types
      @delta_map_types ||=
        {}.tap do |h|
          current_map_types = Music.fetch_map_types
          all_map_types.each do |uid, types_list|
            h[uid] = types_list - current_map_types.fetch(uid) { [] }
          end
        end
    end

    def all_map_types
      @all_map_types ||=
        {}.tap do |h|
          ac_table.map_tables.each do |uid, map_table|
            h[uid] = ::Map.types.select { |ps, d| map_table.fetch_map(ps, d).exist_bms? }
          end
        end
    end
  end
end
