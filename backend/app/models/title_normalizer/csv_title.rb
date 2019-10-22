# frozen_string_literal: true

module TitleNormalizer
  class CSVTitle
    include Filterable

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
      '焱影' => '炎影',
      '火影' => '炎影',
      '超!!遠距離らぶ♥メ〜ル' => '超!!遠距離らぶ?メ～ル',
    }.freeze

    self.filters = [
      Filters::IrregularFilter.new(IRREGULAR_MAPS),

      Filters::BracketsNormalizationFilter.new,
      Filters::ZenkakuFilter.new,
      Filters::FeatFilter.new,
      Filters::HorizontalEllipsisFilter.new,

      Filters::TrimSpaceBetweenBrackets.new,

      # halfwidth comma => fullwidth comma
      # the halfwidth comma is escaped in the CSV.
      Filters::CommaNormalizationFilter.new(target: :fullwidth),

      Filters::ApproximationFilter.new,

      # fullwidth tilde (U+FF5E) は RemoveNonSJISCharactersFilter に通すと
      # 消されてしまうので wave dash (U+301C) に変換しておく
      Filters::WaveDashTildeFilter.new(target: :wave_dash),

      Filters::RemoveNonSJISCharactersFilter.new,

      # wave dash (U+301C) => fullwidth tilde (U+FF5E)
      # the fullwidth tilde (U+FF5E) is used in the official (e-AMUSEMENT)
      # instead of the wave dash (U+301C).
      Filters::WaveDashTildeFilter.new(target: :tilde),

      Filters::LeggendariaDeletionFilter.new,
      Filters::SubTitleIsolationFilter.new,

      Filters::SqueezingFilter.new,
      Filters::StripFilter.new,
    ]
  end
end
