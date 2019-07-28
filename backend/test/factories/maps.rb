# frozen_string_literal: true

FactoryBot.define do
  factory :map do
    num_notes { Random.rand(0..3000) }
    level { Random.rand(1..12) }
    play_style { Map.play_style.values.sample }
    difficulty { Map.difficulty.values.sample }
    min_bpm { Random.rand(1..100) }
    max_bpm { Random.rand(101..400) }
  end

  trait :with_music do
    association :music
  end

  trait :with_bpi_vars do
    after :create do |map|
      create(:world_record_result, map: map, score: Random.rand((map.max_score / 2).to_i..map.max_score))
      create(:kaiden_average_result, map: map, score: Random.rand(0..(map.max_score / 2).to_i))
    end
  end
end
