# frozen_string_literal: true

FactoryBot.define do
  factory :iidx_music do
    version { IIDXMusic::VERSION_MAP.keys.sample }
    title { Faker::Job.title }
    genre { Faker::Music.genre }
    artist { Faker::Artist.name }
  end
end
