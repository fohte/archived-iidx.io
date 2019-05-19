# frozen_string_literal: true

class Series < ApplicationRecord
  def self.by_version!(number)
    find_by!(version_number: number)
  end

  def self.by_version(number)
    find_by(version_number: number)
  end
end
