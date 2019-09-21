# frozen_string_literal: true

module CSVTitleNormalizer
  def self.normalize(title)
    # halfwidth comma => fullwidth comma
    # the halfwidth comma is escaped in the CSV.
    title = title.tr(',', '，')

    # latin capital letter ae => A
    title = title.tr('Æ', 'A')

    # remove the non Shift_JIS characters
    title = title.encode('Shift_JIS', invalid: :replace, undef: :replace, replace: ' ').encode('UTF-8')

    # wave dash (U+301C) => fullwidth tilde (U+FF5E)
    # the fullwidth tilde (U+FF5E) is used in the official (e-AMUSEMENT)
    # instead of the wave dash (U+301C).
    title = title.tr('〜', '～')

    # remove two or more consecutive whitespaces
    title = title.squeeze(' ')

    title
  end
end
