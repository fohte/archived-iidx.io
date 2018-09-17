# frozen_string_literal: true

class UserProfile < ApplicationRecord
  belongs_to :user

  validates :display_name, presence: true
end
