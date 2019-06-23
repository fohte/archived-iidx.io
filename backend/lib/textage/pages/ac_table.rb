# typed: true
# frozen_string_literal: true

module Textage
  module Pages
    class ACTable
      # @param actbl_js [String] textage.cc/actbl.js
      def initialize(actbl_js)
        @js = JavaScriptParser.new(actbl_js)
      end

      # @return [Hash<Symbol, MapTable>]
      def map_tables
        @map_tables ||= {}.tap do |hash|
          @js.fetch_variable!(:actbl).each do |key, value|
            key = key.to_sym
            next if Textage.ignore_key?(key)

            map_table = MapTable.from_raw_array(value)
            next unless map_table.release_status&.ac?

            hash[key] = map_table
          end
        end
      end

      # @return [Hash<String, Array<Symbol>>]
      def event_list
        @event_list ||= @js.fetch_variable(:e_list, [])[0].to_h
      end

      # @return [Array<Symbol>]
      def leggendaria_uids
        @leggendaria_uids ||= event_list.fetch('LEGGENDARIA', []).map(&:to_sym).reject do |key|
          Textage.ignore_key?(key)
        end
      end

      # @param uid [Symbol]
      def leggendaria?(uid)
        leggendaria_uids.include?(uid)
      end
    end
  end
end
