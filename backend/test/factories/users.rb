# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    uid { SecureRandom.base64 }
    firebase_uid { SecureRandom.base64 }

    trait :with_profile do
      after :build do |user|
        user.profile = build(:user_profile)
      end
    end
  end
end
