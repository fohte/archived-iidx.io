# frozen_string_literal: true

module TitleNormalizer
  class CSVTitle
    include Filterable

    self.filters = [
      # halfwidth comma => fullwidth comma
      # the halfwidth comma is escaped in the CSV.
      Filters::CommaNormalizationFilter.new(target: :fullwidth),

      Filters::ApproximationFilter.new,
      Filters::RemoveNonSJISCharactersFilter.new,

      # wave dash (U+301C) => fullwidth tilde (U+FF5E)
      # the fullwidth tilde (U+FF5E) is used in the official (e-AMUSEMENT)
      # instead of the wave dash (U+301C).
      Filters::WaveDashTildeFilter.new(target: :tilde),

      Filters::SqueezingFilter.new,
    ]
  end
end
