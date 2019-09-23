# frozen_string_literal: true

module Textage
  module Pages
    class TitleTable
      # @return [Textage::Loader]
      attr_reader :loader

      def initialize(loader: Loader.new)
        @loader = loader
      end

      # @return [Hash<Symbol, Music>]
      def musics
        @musics ||= {}.tap do |hash|
          titletbl.each do |key, arr|
            next if Textage.ignore_key?(key)

            music = TitleTable::Music.new(arr)
            next unless music.in_ac?

            hash[key.to_sym] = music
          end
        end
      end

      private

      # @return [String] textage.cc/titletbl.js
      def raw_titletbl_js
        @raw_titletbl_js ||= loader.fetch(Routes::Score.title_table_js)
      end

      # @return [Textage::JavaScriptParser]
      def titletbl_js
        @titletbl_js ||= JavaScriptParser.new(raw_titletbl_js)
      end

      def titletbl
        @titletbl ||= titletbl_js.fetch_variable!(:titletbl)
      end
    end
  end
end
