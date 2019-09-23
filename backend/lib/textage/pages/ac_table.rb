# frozen_string_literal: true

module Textage
  module Pages
    class ACTable
      # @return [Textage::Loader]
      attr_reader :loader

      def initialize(loader: Loader.new)
        @loader = loader
      end

      # @return [Hash<Symbol, MapTable>]
      def map_tables
        @map_tables ||= {}.tap do |hash|
          actbl.each do |key, value|
            key = key.to_sym
            next if Textage.ignore_key?(key)

            map_table = MapTable.new(value)
            next unless map_table.in_ac?

            hash[key] = map_table
          end
        end
      end

      # @param uid [Symbol]
      def leggendaria?(uid)
        leggendaria_uids.include?(uid)
      end

      private

      # @return [String] textage.cc/actbl.js
      def raw_actbl_js
        @raw_actbl_js ||= loader.fetch(Routes::Score.ac_table_js)
      end

      def actbl_js
        @actbl_js = JavaScriptParser.new(raw_actbl_js)
      end

      def actbl
        @actbl ||= actbl_js.fetch_variable!(:actbl)
      end

      # @return [Hash<String, Array<Symbol>>]
      def event_list
        @event_list ||= actbl_js.fetch_variable(:e_list, [])[0].to_h
      end

      # @return [Array<Symbol>]
      def leggendaria_uids
        @leggendaria_uids ||= event_list.fetch('LEGGENDARIA', []).map(&:to_sym).reject do |key|
          Textage.ignore_key?(key)
        end
      end
    end
  end
end
