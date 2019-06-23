# typed: true
# frozen_string_literal: true

module Textage
  module Pages
    class Score
      class BMS
        # @param prepared_definition_source [String]
        # @param js_source [String]
        # @param play_style [:sp, :dp]
        # @param difficulty [:normal, :hyper, :another]
        def initialize(prepared_definition_source, js_source, play_style:, difficulty:)
          @js = JavaScriptParser.new(
            prepared_definition_source,
            play_style_js(play_style),
            difficulty_js(difficulty),
            js_source,
          )
        end

        # @return [Integer]
        def notes
          @js.fetch_variable!('notes').to_i
        end

        private

        # @param play_style [:sp, :dp]
        # @return [String]
        def play_style_js(play_style)
          case play_style
          when :sp
            ''
          when :dp
            <<~JS
              k = 0
              key = 14
            JS
          end
        end

        # @param difficulty [:normal, :hyper, :another]
        # @return [String]
        def difficulty_js(difficulty)
          case difficulty
          when :normal
            <<~JS
              l = 1
              hps = 1
            JS
          when :hyper
            <<~JS
              hps = 1
            JS
          when :another
            <<~JS
              a = 1
            JS
          end
        end

        # g: sp beginner??
        # k: sph
        #   a: spa
        #   l: spn
        # else: dph, sp???
        #   a: dpa
        #   l: dpn
      end
    end
  end
end
