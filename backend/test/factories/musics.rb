# frozen_string_literal: true

FactoryBot.define do
  factory :music do
    transient do
      title_value { Faker::Job.title }
    end

    title { title_value }
    csv_title { title_value }
    genre { Faker::Music.genre }
    artist { Faker::Artist.name }
    textage_uid { SecureRandom.base64 }

    association :series, factory: :series

    trait :with_maps do
      after :build do |music|
        music.maps = Map.types.map do |play_style, difficulty|
          build(:map, play_style: play_style, difficulty: difficulty)
        end
      end
    end
  end
end
