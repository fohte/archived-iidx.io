# typed: true
# frozen_string_literal: true

module IIDXIO
  module CSVParser
    class Row
      include ActiveModel::Model

      CSV_KEYS = %i[
        version
        title
        genre
        artist
        play_count
        normal_level
        normal_ex_score
        normal_pgreat
        normal_great
        normal_miss_count
        normal_clear_lamp
        normal_dj_level
        hyper_level
        hyper_ex_score
        hyper_pgreat
        hyper_great
        hyper_miss_count
        hyper_clear_lamp
        hyper_dj_level
        another_level
        another_ex_score
        another_pgreat
        another_great
        another_miss_count
        another_clear_lamp
        another_dj_level
        last_played_at
      ].freeze

      # @return [String]
      attr_accessor :version

      # @return [String]
      attr_accessor :title

      # @return [String]
      attr_accessor :genre

      # @return [String]
      attr_accessor :artist

      # @return [Integer]
      attr_accessor :play_count

      # @return [CSVParser::Row::Map]
      attr_accessor :normal

      # @return [CSVParser::Row::Map]
      attr_accessor :hyper

      # @return [CSVParser::Row::Map]
      attr_accessor :another

      # @return [ActiveSupport::TimeWithZone]
      attr_accessor :last_played_at

      class << self
        # @param csv [String]
        def from_csv(csv)
          raw = parse_csv_raw(csv)

          new(
            version: raw[:version],
            title: raw[:title],
            genre: raw[:genre],
            artist: raw[:artist],
            play_count: raw[:play_count].to_i,
            normal: parse_map(raw, :normal),
            hyper: parse_map(raw, :hyper),
            another: parse_map(raw, :another),
            last_played_at: Time.zone.parse(raw[:last_played_at]),
          )
        end

        private

        # @param csv [String]
        # @return [Hash<Symbol, any>]
        def parse_csv_raw(csv)
          CSV_KEYS.zip(csv.split(',')).to_h
        end

        # @param raw_hash [Hash<Symbol, any>]
        # @param difficulty [#to_s]
        # @return [CSVParser::Row::Map]
        def parse_map(raw_hash, difficulty)
          dj_level = raw_hash[:"#{difficulty}_dj_level"].yield_self { |v| v == '---' ? nil : v }
          clear_lamp = raw_hash[:"#{difficulty}_clear_lamp"].yield_self { |v| v == 'NO PLAY' ? nil : v }
          miss_count = raw_hash[:"#{difficulty}_miss_count"].yield_self { |v| v == '---' ? nil : v.to_i }

          CSVParser::Row::Map.new(
            level: raw_hash[:"#{difficulty}_level"].to_i,
            ex_score: !miss_count.nil? ? raw_hash[:"#{difficulty}_ex_score"].to_i : nil,
            pgreat: !miss_count.nil? ? raw_hash[:"#{difficulty}_pgreat"].to_i : nil,
            great: !miss_count.nil? ? raw_hash[:"#{difficulty}_great"].to_i : nil,
            miss_count: miss_count,
            clear_lamp: clear_lamp,
            dj_level: dj_level,
          )
        end
      end
    end
  end
end
