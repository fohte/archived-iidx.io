# frozen_string_literal: true

class UserAuthEmail < ApplicationRecord
  belongs_to :user

  has_secure_password

  validates :email, presence: true, uniqueness: true
end
