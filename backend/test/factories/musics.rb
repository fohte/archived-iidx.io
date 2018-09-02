# frozen_string_literal: true

FactoryBot.define do
  factory :music do
    title { Faker::Job.title }
    sub_title { Faker::Job.title }
    genre { Faker::Music.genre }
    artist { Faker::Artist.name }
    textage_uid { SecureRandom.base64 }
    series { Music.series.values.sample }

    trait :with_maps do
      after :build do |music|
        music.maps = Map.types.map do |play_style, difficulty|
          build(:map, play_style: play_style, difficulty: difficulty)
        end
      end
    end
  end
end
