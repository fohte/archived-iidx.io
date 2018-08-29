# frozen_string_literal: true

class IIDXMusic < ApplicationRecord
  belongs_to :music, required: false
end
