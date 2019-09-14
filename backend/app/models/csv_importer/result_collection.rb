# frozen_string_literal: true

module CSVImporter
  class ResultCollection
    # @return [User]
    attr_reader :user

    # @return [CSVImporter::MapCollection]
    attr_reader :maps

    def initialize(user:, maps:)
      @user = user
      @maps = maps
    end

    def find_by_music_id(music_id)
      return {} if music_id.nil? || !results.key?(music_id)

      rs = results[music_id]
      rs.map { |r| maps.find_difficulty(r.map_id) }.zip(rs).to_h
    end

    private

    def results
      @results ||=
        user
        .results
        .where(map_id: maps.ids)
        .group_by { |r| maps.find_music_id(r.map_id) }
    end
  end
end
