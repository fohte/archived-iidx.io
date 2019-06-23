# typed: false
# frozen_string_literal: true

FactoryBot.define do
  factory :user_profile do
    display_name { Faker::String.random(40) }
  end
end
