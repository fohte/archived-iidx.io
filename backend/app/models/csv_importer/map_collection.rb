# frozen_string_literal: true

module CSVImporter
  class MapCollection
    # @return [:sp, :dp]
    attr_reader :play_style

    # @return [CSVImporter::MusicCollection]
    attr_reader :musics

    def initialize(play_style:, musics:)
      @play_style = play_style
      @musics = musics
    end

    def ids
      maps.keys
    end

    def find(map_id)
      maps[map_id]
    end

    def find_difficulty(map_id)
      maps.dig(map_id, :difficulty).to_sym
    end

    def find_music_id(map_id)
      maps.dig(map_id, :music_id)
    end

    def find_by_music_id(music_id)
      maps_by_music_id.fetch(music_id, {})
    end

    private

    def maps
      @maps ||=
        Map
        .where(play_style: play_style, music_id: musics.ids)
        .pluck(:id, :music_id, :difficulty)
        .map { |id, music_id, difficulty| [id, { music_id: music_id, difficulty: difficulty }] }
        .to_h
    end

    def maps_by_music_id
      @maps_by_music_id ||= {}.tap do |h|
        maps.each do |map_id, map|
          (h[map[:music_id]] ||= {})[map[:difficulty].to_sym] = map_id
        end
      end
    end
  end
end
