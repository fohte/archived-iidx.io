# frozen_string_literal: true

module IIDXIO
  module CSVParser
    class Row
      CSV_KEYS = %i[
        version title genre artist play_count
        normal_level normal_ex_score normal_pgreat normal_great normal_miss_count normal_clear_lamp normal_dj_level
        hyper_level hyper_ex_score hyper_pgreat hyper_great hyper_miss_count hyper_clear_lamp hyper_dj_level
        another_level another_ex_score another_pgreat another_great another_miss_count another_clear_lamp another_dj_level
        last_played_at
      ].freeze

      # @return [String]
      attr_reader :csv

      def initialize(csv)
        @csv = csv
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

      # @return [ActiveSupport::TimeWithZone]
      def last_played_at
        @last_played_at ||=
          # 暗黙的に JST で出力されるので JST として parse する
          Time.use_zone('Asia/Tokyo') do
            Time.zone.parse(raw_map[:last_played_at])
          end
      end

      private

      # @return [Hash<Symbol, any>]
      def raw_map
        @raw_map ||= CSV_KEYS.zip(csv.split(',')).to_h
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
