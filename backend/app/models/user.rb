# frozen_string_literal: true

class User < ApplicationRecord
  has_one :profile, class_name: 'UserProfile', dependent: :destroy
  has_many :results, dependent: :destroy

  validates :uid, presence: true, uniqueness: true
end
