# frozen_string_literal: true

module CSVImporter
  class MusicCollection
    # @return [Array<String>]
    attr_reader :titles

    def initialize(titles:)
      @titles = titles
    end

    def ids
      musics.values
    end

    def find_id_by_title(title)
      musics[title]
    end

    private

    def musics
      @musics ||= Music.where(csv_title: titles).pluck(:csv_title, :id).to_h
    end
  end
end
