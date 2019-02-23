# frozen_string_literal: true

class ResultBatch < ApplicationRecord
  belongs_to :user

  has_many :results, dependent: :destroy
end
