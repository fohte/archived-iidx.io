# frozen_string_literal: true

FactoryBot.define do
  factory :result do
    score { Random.rand(0..4000) }
    miss_count { Random.rand(0..100) }
    clear_lamp { Result.clear_lamp.values.sample }
    last_played_at { Faker::Date.backward }

    trait :with_map do
      transient { num_notes { Random.rand(0..3000) } }

      map { create(:map, num_notes: num_notes) }
      score { Random.rand(0..num_notes * 2) }
    end

    trait :with_music do
      association :map, :with_music
    end

    trait :with_user do
      association :user
    end
  end
end
