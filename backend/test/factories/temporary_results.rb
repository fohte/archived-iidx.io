# frozen_string_literal: true

FactoryBot.define do
  factory :temporary_result do
    version { Music.series.values.sample.to_s }
    title { Faker::Job.title }
    genre { Faker::Music.genre }
    artist { Faker::Artist.name }

    level { Random.rand(1..12) }
    play_style { Map.play_style.values.sample }
    difficulty { Map.difficulty.values.sample }

    score { Random.rand(0..4000) }
    miss_count { Random.rand(0..100) }
    clear_lamp { Result.clear_lamp.values.sample }
    series { %i[rootage heroic_verse].sample }
    last_played_at { Faker::Date.backward }
  end
end
