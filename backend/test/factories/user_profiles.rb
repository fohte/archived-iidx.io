# frozen_string_literal: true

FactoryBot.define do
  factory :user_profile do
    name { Faker::Name.name }
  end
end
