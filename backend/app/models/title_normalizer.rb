# frozen_string_literal: true

module TitleNormalizer
  def self.as_csv_title(title)
    CSVTitle.new(title).filter
  end
end
