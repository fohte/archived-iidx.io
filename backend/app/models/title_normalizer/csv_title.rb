# frozen_string_literal: true

module TitleNormalizer
  class CSVTitle
    include Filterable

    self.filters = [
      Filters::IrregularFilter.new,

      Filters::BracketsNormalizationFilter.new,
      Filters::ZenkakuFilter.new,
      Filters::FeatFilter.new,
      Filters::HorizontalEllipsisFilter.new,

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

      Filters::SubTitleIsolationFilter.new,
      Filters::SpaceBeforeLeggendariaDeletionFilter.new,

      Filters::SqueezingFilter.new,
      Filters::StripFilter.new,
    ]
  end
end
