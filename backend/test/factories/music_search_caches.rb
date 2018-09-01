# frozen_string_literal: true

FactoryBot.define do
  factory :music_search_cache do
    version { MusicSearchCache::VERSION_MAP.keys.sample }
    title { Faker::Job.title }
    genre { Faker::Music.genre }
    artist { Faker::Artist.name }
  end
end
