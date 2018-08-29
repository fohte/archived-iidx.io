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
end
