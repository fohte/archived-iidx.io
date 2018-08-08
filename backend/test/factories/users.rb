# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    uid { SecureRandom.base64 }
    firebase_uid { SecureRandom.base64 }
  end
end
