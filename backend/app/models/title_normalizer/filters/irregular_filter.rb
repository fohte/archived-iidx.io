# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class IrregularFilter < BaseFilter
      IRREGULAR_MAPS = {
        'Anisakis -somatic mutation type "Forza"-' => 'Anisakis -somatic mutation type"Forza"-',
        'Blind Justice 〜Torn souls,Hurt Faiths〜' => 'Blind Justice ～Torn souls， Hurt Faiths ～',
        'CROSSROAD' => 'CROSSROAD ～Left Story～',
        'City Never Sleeps (IIDX EDITION)' => 'City Never Sleeps (IIDX Edition)',
        'Colors -Y&Co. Eurobeat Remix-' => 'Colors -Y&Co.Eurobeat Remix-',
        'Usual Days-remix' => 'Usual Days -remix',
        'キャトられ♥恋はモ〜モク' => 'キャトられ恋はモ～モク',
        'パラドキシカル・タイムリープトライアル (Short.Ver)' => 'パラドキシカル・タイムリープトライアル (Short Ver.)',
        '共犯ヘヴンズコード' => '共犯へヴンズコード',
        '超!!遠距離らぶ♥メ〜ル' => '超!!遠距離らぶ?メ～ル',
      }.freeze

      def call(str)
        IRREGULAR_MAPS[str] || str
      end
    end
  end
end
