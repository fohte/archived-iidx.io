# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class IrregularFilter < BaseFilter
      IRREGULAR_MAPS = {
        'Anisakis -somatic mutation type "Forza"-' => 'Anisakis -somatic mutation type"Forza"-',
        'Blind Justice 〜Torn souls,Hurt Faiths〜' => 'Blind Justice ～Torn souls， Hurt Faiths ～',
        'CROSSROAD' => 'CROSSROAD ～Left Story～',
        'City Never Sleeps (IIDX EDITION)' => 'City Never Sleeps (IIDX Edition)',
        'キャトられ♥恋はモ〜モク' => 'キャトられ恋はモ～モク',
        'パラドキシカル・タイムリープトライアル (Short.Ver)' => 'パラドキシカル・タイムリープトライアル (Short Ver.)',
        '共犯ヘヴンズコード' => '共犯へヴンズコード',
      }.freeze

      def call(str)
        IRREGULAR_MAPS[str] || str
      end
    end
  end
end
