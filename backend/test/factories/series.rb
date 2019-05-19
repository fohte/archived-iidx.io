# frozen_string_literal: true

FactoryBot.define do
  factory :series do
    name { Faker::Job.title }
    version_number { Random.rand(50) }
  end
end
