# frozen_string_literal: true

FactoryBot.define do
  factory :world_record_result do
    score { Random.rand(0..4000) }
  end
end
