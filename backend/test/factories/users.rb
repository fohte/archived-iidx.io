# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { [[*'a'..'z', *'A'..'Z', '_'].sample, *['a'..'z', *'A'..'Z', *'0'..'9', '_'].sample(9)].join }
    firebase_uid { SecureRandom.base64 }

    trait :with_profile do
      after :build do |user|
        user.profile = build(:user_profile)
      end
    end
  end
end
