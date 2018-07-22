# frozen_string_literal: true

FactoryBot.define do
  factory :music do
    name { Faker::Job.title }
    sub_name { Faker::Job.title }
    genre { Faker::Music.genre }
    artist { Faker::Artist.name }
    textage_uid { SecureRandom.base64 }
    series { Music.series.values.sample }
  end
end
