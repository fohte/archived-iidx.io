# frozen_string_literal: true

FactoryBot.define do
  factory :result_log do
    score { Random.rand(0..4000) }
    miss_count { Random.rand(0..100) }
    clear_lamp { Result.clear_lamp.values.sample }
    last_played_at { Faker::Date.backward }
  end
end
