# frozen_string_literal: true

module IIDXIO
  module CSVParser
    module Row
      class Base
        # @return [String]
        attr_reader :csv

        def initialize(csv)
          @csv = csv
        end

        # @return [CSVParser::Row::Data]
        def to_data
          Row::Data.new(
            version: version,
            title: TitleNormalizer.as_csv_title(title),
            genre: genre,
            artist: artist,
            play_count: play_count,
            beginner: beginner,
            normal: normal,
            hyper: hyper,
            another: another,
            leggendaria: leggendaria,
            last_played_at: last_played_at,
          )
        end

        # @return [String]
        def version
          raw_map[:version]
        end

        # @return [String]
        def title
          raw_map[:title]
        end

        # @return [String]
        def genre
          raw_map[:genre]
        end

        # @return [String]
        def artist
          raw_map[:artist]
        end

        # @return [Integer]
        def play_count
          raw_map[:play_count].to_i
        end

        # @return [CSVParser::Row::Map]
        def beginner
          @beginner ||= parse_map(:beginner)
        end

        # @return [CSVParser::Row::Map]
        def normal
          @normal ||= parse_map(:normal)
        end

        # @return [CSVParser::Row::Map]
        def hyper
          @hyper ||= parse_map(:hyper)
        end

        # @return [CSVParser::Row::Map]
        def another
          @another ||= parse_map(:another)
        end

        # @return [CSVParser::Row::Map]
        def leggendaria
          @leggendaria ||= parse_map(:leggendaria)
        end

        # @return [ActiveSupport::TimeWithZone]
        def last_played_at
          @last_played_at ||=
            # 暗黙的に JST で出力されるので JST として parse する
            Time.use_zone('Asia/Tokyo') do
              Time.zone.parse(raw_map[:last_played_at])
            end
        end

        def csv_keys
          raise NotImplementedError
        end

        private

        # @return [Hash<Symbol, any>]
        def raw_map
          @raw_map ||= csv_keys.zip(csv.split(',')).to_h
        end

        def parse_map(difficulty)
          CSVParser::Row::Map.new(
            level: @raw_map[:"#{difficulty}_level"],
            ex_score: @raw_map[:"#{difficulty}_ex_score"],
            pgreat: @raw_map[:"#{difficulty}_pgreat"],
            great: @raw_map[:"#{difficulty}_great"],
            miss_count: @raw_map[:"#{difficulty}_miss_count"],
            clear_lamp: @raw_map[:"#{difficulty}_clear_lamp"],
            dj_level: @raw_map[:"#{difficulty}_dj_level"],
          )
        end
      end
    end
  end
end
