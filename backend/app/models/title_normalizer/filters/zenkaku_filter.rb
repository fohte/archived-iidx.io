# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class ZenkakuFilter < BaseFilter
      ZENKAKU_HANKAKU_MAPS = {
        '”' => '"',
        '！' => '!',
        '％' => '%',
        '＊' => '*',
        '？' => '?',
      }.freeze

      def call(str)
        str = str.chars.map do |c|
          ZENKAKU_HANKAKU_MAPS[c] || c
        end.join

        str.tr!('Ａ-Ｚａ-ｚ', 'A-Za-z')

        str
      end
    end
  end
end
