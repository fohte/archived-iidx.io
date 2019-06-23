# typed: strict
# frozen_string_literal: true

class ResultBatch < ApplicationRecord
  belongs_to :user

  has_many :results, dependent: :destroy
  has_many :temporary_results, dependent: :destroy
end
