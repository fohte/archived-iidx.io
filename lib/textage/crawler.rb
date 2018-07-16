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
      title_table.musics.lazy.map do |uid, music|
        ::Music.new(
          name: music.title,
          sub_name: music.sub_title,
          genre: music.genre,
          artist: music.artist,
          textage_uid: uid,
          seriese: to_sereise(music.version),
          leggendaria: ac_table.leggendaria?(uid),
          maps: crawl_maps_each(uid).to_a,
        )
      end
    end

    # @param uid [Symbol]
    # @return [Enumerator<::Map>]
    def crawl_maps_each(uid)
      map_table = ac_table.map_tables[uid]

      score_page = fetch_score_page(title_table.musics[uid].version, uid)

      Enumerator.new do |yielder|
        %i[sp dp].each do |play_style|
          %i[normal hyper another].each do |difficulty|
            map = map_table.send("#{play_style}_#{difficulty}")
            next unless map.exist_bms?

            bms = score_page.bms(play_style: play_style, difficulty: difficulty)
            yielder.yield ::Map.new(
              num_notes: bms.notes,
              level: map.level,
              play_style: play_style,
              difficulty: difficulty,
              min_bpm: score_page.bpm.min,
              max_bpm: score_page.bpm.max,
            )
          end
        end
      end
    end

    private

    def title_table
      @title_table ||= Pages::TitleTable.new(loader.fetch(Routes::Score.title_table_js))
    end

    def ac_table
      @ac_table ||= Pages::ACTable.new(loader.fetch(Routes::Score.ac_table_js))
    end

    def fetch_score_page(textage_version, uid)
      Pages::Score.new(loader.fetch(Routes::Score.show(textage_version, uid)))
    end

    def to_sereise(textage_version)
      return 1 if textage_version == 28

      textage_version
    end
  end
end
