# frozen_string_literal: true

module Textage
  module Pages
    class TitleTable
      # @param titletbl_js [String] textage.cc/titletbl.js
      def initialize(titletbl_js)
        @js = JavaScriptParser.new(titletbl_js)
      end

      # @return [Hash<Symbol, Music>]
      def musics
        @musics ||= {}.tap do |hash|
          @js.fetch_variable!(:titletbl).each do |key, arr|
            next if Textage.ignore_key?(key)
            music = Music.from_raw_array(arr)
            next unless music.in_ac?
            hash[key.to_sym] = music
          end
        end
      end
    end
  end
end
